import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Alert, ScrollView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import { updatePersonalInfo, uploadProfilePhoto } from '../services/sitterService';
import { getMediaUrl } from '../api/api';
import { colors, spacing, typography } from '../theme';

const EditProfileScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [dob, setDob] = useState(profile.date_of_birth || '');
  const [emergencyName, setEmergencyName] = useState(profile.emergency_contact_name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergency_contact_phone || '');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    let photoUrl = profile.profile_photo;
    setIsUploading(true);

    if (image) {
      try {
        const uploadResponse = await uploadProfilePhoto(image);
        photoUrl = uploadResponse.data.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        Alert.alert("Error", "Could not upload the new profile photo.");
        setIsUploading(false);
        return;
      }
    }

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
      Alert.alert("Error", error.response?.data?.detail[0]?.msg || "Failed to update profile.");
    } finally {
      setIsUploading(false);
    }
  };

  const displayImageUri = image || getMediaUrl(profile.profile_photo);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: displayImageUri }} style={styles.image} />
        <Button title="Change Photo" onPress={pickImage} style={styles.tertiaryButton} textStyle={styles.tertiaryButtonText} />
      </View>
      
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="Your full name" value={fullName} onChangeText={setFullName} />
      
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={dob} onChangeText={setDob} />
      
      <Text style={styles.label}>Emergency Contact Name</Text>
      <TextInput style={styles.input} placeholder="Name of emergency contact" value={emergencyName} onChangeText={setEmergencyName} />
      
      <Text style={styles.label}>Emergency Contact Phone</Text>
      <TextInput style={styles.input} placeholder="Phone of emergency contact" value={emergencyPhone} onChangeText={setEmergencyPhone} keyboardType="phone-pad" />

      <Button title={isUploading ? "Saving..." : "Save Changes"} onPress={handleSave} disabled={isUploading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: spacing.large,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.lightGray,
    marginBottom: spacing.small,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: spacing.medium,
    ...typography.body,
    marginBottom: spacing.medium,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  tertiaryButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
