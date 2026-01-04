import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Button from '../components/Button';
import { colors, spacing, typography } from '../theme';
import {
  emailLogin,
  verifyOtp,
  mobileLogin,
  verifyMobileOtp,
  googleLogin,
} from '../services/authService';

const LoginScreen = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const response = await googleLogin();
      console.log('Redirect to Google login:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await emailLogin({ email });
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMobileLogin = async () => {
    try {
      await mobileLogin({ phone_number: phoneNumber });
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyEmailOtp = async () => {
    try {
      const { data } = await verifyOtp({ email, otp });
      onLogin(data.tokens);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyMobileOtp = async () => {
    try {
      const { data } = await verifyMobileOtp({ phone_number: phoneNumber, otp });
      onLogin(data.tokens);
    } catch (error) {
      console.error(error);
    }
  };

  const renderInitialOptions = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <Button title="Continue with Google" onPress={handleGoogleLogin} />
      <Button title="Continue with Email" onPress={() => setLoginMethod('email')} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
      <Button title="Continue with Mobile" onPress={() => setLoginMethod('mobile')} style={styles.secondaryButton} textStyle={styles.secondaryButtonText} />
    </View>
  );

  const renderForm = (isEmail) => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{isEmail ? 'Email Login' : 'Mobile Login'}</Text>
      {!otpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={isEmail ? 'Enter your email' : 'Enter your phone number'}
            value={isEmail ? email : phoneNumber}
            onChangeText={isEmail ? setEmail : setPhoneNumber}
            keyboardType={isEmail ? 'email-address' : 'phone-pad'}
            autoCapitalize="none"
          />
          <Button title="Send Code" onPress={isEmail ? handleEmailLogin : handleMobileLogin} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter the code"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <Button title="Verify & Sign In" onPress={isEmail ? handleVerifyEmailOtp : handleVerifyMobileOtp} />
        </>
      )}
    </View>
  );

  const renderContent = () => {
    switch (loginMethod) {
      case 'email':
        return renderForm(true);
      case 'mobile':
        return renderForm(false);
      default:
        return renderInitialOptions();
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      {loginMethod && <Button title="Back to options" onPress={() => { setLoginMethod(null); setOtpSent(false); }} style={styles.tertiaryButton} textStyle={styles.tertiaryButtonText} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: spacing.large,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.large,
    color: colors.secondary,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: spacing.medium,
    width: '100%',
    ...typography.body,
    marginBottom: spacing.medium,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  tertiaryButtonText: {
    color: colors.secondary,
    fontWeight: 'normal',
  },
});

export default LoginScreen;
