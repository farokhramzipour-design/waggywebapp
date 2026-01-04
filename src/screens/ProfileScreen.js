import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../components/Button';
import { getMyProfile } from '../services/sitterService';
import { logout } from '../services/authService';
import { getMediaUrl } from '../api/api';
import { colors, spacing, typography } from '../theme';

const ProfileScreen = ({ navigation, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile && (
        <View style={styles.card}>
          <Image source={{ uri: getMediaUrl(profile.profile_photo) }} style={styles.image} />
          <Text style={styles.name}>{profile.full_name || 'User'}</Text>
          <Text style={styles.email}>{profile.user_id}</Text>
          <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { profile })} />
        </View>
      )}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: spacing.large,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.medium,
    backgroundColor: colors.lightGray,
  },
  name: {
    ...typography.h2,
    marginBottom: spacing.small,
  },
  email: {
    ...typography.body,
    color: colors.secondary,
    marginBottom: spacing.large,
  },
  logoutButtonContainer: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default ProfileScreen;
