import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import { updatePersonalInfo, uploadProfilePhoto } from '../services/sitterService';
import { getMediaUrl } from '../api/api';

const EditProfileScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [dob, setDob] = useState(profile.date_of_birth || '');
  const [emergencyName, setEmergencyName] = useState(profile.emergency_contact_name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergency_contact_phone || '');
  const [image, setImage] = useState(null); // This will hold the new image URI

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    let photoUrl = profile.profile_photo;

    // If a new image was selected, upload it first
    if (image) {
      try {
        const uploadResponse = await uploadProfilePhoto(image);
        // Assuming the API returns the URL of the uploaded photo
        photoUrl = uploadResponse.data.url; 
      } catch (error) {
        console.error("Image upload failed:", error);
        Alert.alert("Error", "Could not upload the new profile photo.");
        return;
      }
    }

    // Now, update the personal info with the new (or existing) photo URL
    try {
      const personalInfo = {
        full_name: fullName,
        date_of_birth: dob,
        profile_photo: photoUrl,
        emergency_contact_name: emergencyName,
        emergency_contact_phone: emergencyPhone,
      };
      
      await updatePersonalInfo(personalInfo);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.detail || "Failed to update profile.");
    }
  };

  // Determine which image to display: the new one or the existing one
  const displayImageUri = image || getMediaUrl(profile.profile_photo);

  return (
    <View style={styles.container}>
      <Image source={{ uri: displayImageUri }} style={styles.image} />
      <Button title="Change Profile Photo" onPress={pickImage} />
      
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
      <TextInput style={styles.input} placeholder="Emergency Contact Name" value={emergencyName} onChangeText={setEmergencyName} />
      <TextInput style={styles.input} placeholder="Emergency Contact Phone" value={emergencyPhone} onChangeText={setEmergencyPhone} />

      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  image: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 20, backgroundColor: '#ccc' },
});

export default EditProfileScreen;
