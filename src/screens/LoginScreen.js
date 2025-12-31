import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { emailLogin, verifyOtp } from '../services/authService';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailLogin = async () => {
    try {
      await emailLogin({ email });
      setOtpSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await verifyOtp({ email, otp });
      onLogin(data.tokens);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
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
          <Button title="Login" onPress={handleVerifyOtp} />
        </>
      )}
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
