import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import { getMyProfile } from '../services/sitterService';
import { logout } from '../services/authService';
import { getMediaUrl } from '../api/api';

const ProfileScreen = ({ navigation, onLogout }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // useFocusEffect will refetch the profile every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Image source={{ uri: getMediaUrl(profile.profile_photo) }} style={styles.image} />
          <Text style={styles.name}>Welcome, {profile.full_name || 'User'}</Text>
          <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { profile })} />
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 40,
  }
});

export default ProfileScreen;
