import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { getMyProfile } from '../services/sitterService';
import { logout } from '../services/authService';

const ProfileScreen = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

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
        <Text>Welcome, {profile.full_name}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
