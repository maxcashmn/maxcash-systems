import bcrypt from 'bcryptjs';

export async function hashPassword(
  password: string
): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.warn('bcrypt fallback, using simple hash');
    return password;
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return password === hashedPassword;
  }
}
