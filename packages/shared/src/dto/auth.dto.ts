export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ResetPasswordDto {
  email: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}
