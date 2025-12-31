import apiClient from '../api/api';
import type {
  GoogleAuthRequest,
  EmailLoginRequest,
  VerifyOtpRequest,
  MobileLoginRequest,
  VerifyMobileOtpRequest,
  AuthResponse,
} from '../models/auth';

export const googleLogin = () => {
  return apiClient.get('/auth/login/google');
};

export const googleCallback = () => {
  return apiClient.get('/auth/callback/google');
};

export const googleAuth = (data: GoogleAuthRequest): Promise<AuthResponse> => {
  return apiClient.post('/auth/google', data);
};

export const emailLogin = (data: EmailLoginRequest) => {
  return apiClient.post('/auth/email/login', data);
};

export const verifyOtp = (data: VerifyOtpRequest): Promise<AuthResponse> => {
  return apiClient.post('/auth/email/verify', data);
};

export const mobileLogin = (data: MobileLoginRequest) => {
  return apiClient.post('/auth/mobile/login', data);
};

export const verifyMobileOtp = (data: VerifyMobileOtpRequest): Promise<AuthResponse> => {
  return apiClient.post('/auth/mobile/verify', data);
};

export const logout = () => {
  return apiClient.post('/auth/logout');
};
