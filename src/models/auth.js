// Auth models

export interface GoogleAuthRequest {
  id_token: string;
}

export interface EmailLoginRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface MobileLoginRequest {
  phone_number: string;
}

export interface VerifyMobileOtpRequest {
  phone_number: string;
  otp: string;
}

export interface UserResponse {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  is_email_verified: boolean;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AuthData {
  user: UserResponse;
  tokens: Tokens;
}

export interface AuthResponse {
  success: boolean;
  data: AuthData;
}
