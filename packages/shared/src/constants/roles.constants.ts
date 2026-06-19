export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AUDITOR: 'auditor',
  BORROWER: 'borrower',
} as const;

export const ROLES_LIST = Object.values(ROLES);
