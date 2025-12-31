import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Button from '../components/Button';
import {
  emailLogin,
  verifyOtp,
  mobileLogin,
  verifyMobileOtp,
  googleLogin,
} from '../services/authService';

const LoginScreen = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState(null); // 'email', 'mobile'
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleGoogleLogin = async () => {
    // This would typically involve a library like @react-native-google-signin/google-signin
    // to get the id_token, which would then be sent to our backend.
    // For now, we'll just call the endpoint that initiates the flow.
    try {
      // In a real app, you would get a URL from this call and open it in a browser/webview
      const response = await googleLogin();
      console.log('Redirect to Google login:', response.data);
      // After the user logs in with Google and your backend callback is hit,
      // the backend would redirect back to the app with tokens.
      // This part of the flow is complex to simulate here without a running backend
      // and deep linking setup.
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
    <View>
      <Button title="Login with Google" onPress={handleGoogleLogin} />
      <Button title="Login with Email" onPress={() => setLoginMethod('email')} />
      <Button title="Login with Mobile" onPress={() => setLoginMethod('mobile')} />
    </View>
  );

  const renderEmailLogin = () => (
    !otpSent ? (
      <>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Send OTP" onPress={handleEmailLogin} />
      </>
    ) : (
      <>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <Button title="Login" onPress={handleVerifyEmailOtp} />
      </>
    )
  );

  const renderMobileLogin = () => (
    !otpSent ? (
      <>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Button title="Send OTP" onPress={handleMobileLogin} />
      </>
    ) : (
      <>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <Button title="Login" onPress={handleVerifyMobileOtp} />
      </>
    )
  );

  const renderContent = () => {
    switch (loginMethod) {
      case 'email':
        return renderEmailLogin();
      case 'mobile':
        return renderMobileLogin();
      default:
        return renderInitialOptions();
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      {loginMethod && <Button title="Back" onPress={() => { setLoginMethod(null); setOtpSent(false); }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
