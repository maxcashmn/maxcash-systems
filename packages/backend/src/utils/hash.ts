import bcrypt from 'bcryptjs';
import { authConfig } from '../config';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(authConfig.bcrypt.saltRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
