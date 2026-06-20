import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../errors/AppError';

const userRepo = new UserRepository();

export async function getUserById(id: string) {
  const user = await userRepo.findById(id);
  if (!user) {
    throw AppError.notFound('User not found');
  }
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw AppError.notFound('User not found');
  }
  return user;
}

export async function updateUserProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  }
) {
  const user = await userRepo.findById(userId);
  if (!user) {
    throw AppError.notFound('User not found');
  }

  const updated = await userRepo.update(userId, {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
  });

  return updated;
}

export async function updateUserStatus(userId: string, status: string) {
  const user = await userRepo.findById(userId);
  if (!user) {
    throw AppError.notFound('User not found');
  }

  await userRepo.updateStatus(userId, status);
  return { success: true };
}

export async function deleteUser(userId: string) {
  const user = await userRepo.findById(userId);
  if (!user) {
    throw AppError.notFound('User not found');
  }

  await userRepo.delete(userId);
  return { success: true };
}

export async function listUsers(
  page: number = 1,
  limit: number = 10,
  filter?: { role?: string; status?: string }
) {
  const offset = (page - 1) * limit;
  let whereClause = 'WHERE deleted_at IS NULL';
  const params: any[] = [];

  if (filter?.role) {
    whereClause += ' AND role = $' + (params.length + 1);
    params.push(filter.role);
  }

  if (filter?.status) {
    whereClause += ' AND status = $' + (params.length + 1);
    params.push(filter.status);
  }

  // Use the base repository's query method via a custom method
  const users = await userRepo.query(
    `SELECT * FROM users ${whereClause} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  // Count total (simplified)
  const total = await userRepo.count(filter);

  return {
    data: users.map((row: any) => ({
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      phoneNumber: row.phone_number,
      role: row.role,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
