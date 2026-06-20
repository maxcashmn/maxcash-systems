export function successResponse<T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200
) {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    statusCode,
  };
}

export function errorResponse(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: Record<string, any>
) {
  return {
    success: false,
    message,
    code,
    details,
    timestamp: new Date().toISOString(),
    statusCode,
  };
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = 'Success'
) {
  return {
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  };
}
