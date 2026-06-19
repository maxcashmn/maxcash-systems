export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface UpdateUserStatusDto {
  status: string;
  reason?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
