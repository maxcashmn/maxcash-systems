import { AuditRepository } from '../repositories/auditRepository';
import { generateId } from '../utils/helpers';

const auditRepo = new AuditRepository();

export async function logAuditEvent(data: {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
}) {
  return await auditRepo.create({
    id: generateId(),
    user_id: data.userId,
    action: data.action,
    resource: data.resource,
    resource_id: data.resourceId,
    details: data.details,
    ip_address: data.ipAddress,
    user_agent: data.userAgent,
  });
}

export async function getUserAuditLogs(userId: string) {
  return await auditRepo.findByUserId(userId);
}

export async function getResourceAuditLogs(resource: string, resourceId: string) {
  return await auditRepo.findByResource(resource, resourceId);
}

export async function getActionAuditLogs(action: string) {
  return await auditRepo.findByAction(action);
}
