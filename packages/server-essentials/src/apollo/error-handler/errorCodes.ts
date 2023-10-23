export type ErrorCode = keyof typeof errorData

export const errorData = {
  NOT_FOUND: {
    errorText: 'Resource not found',
    errorDescription:
      'The requested resource could not be found. Please check the provided identifier or parameters and try again.',
  },
  FORBIDDEN: {
    errorText: 'Action is not allowed',
    errorDescription:
      'You are not allowed to perform this action. Please ensure you have the necessary permissions and privileges.',
  },
  QUOTA_EXCEEDED: {
    errorText: 'Quota exceeded',
    errorDescription:
      'The maximum limit for this resource has been reached. Please contact support for assistance or upgrade your plan.',
  },
  USER_INPUT: {
    errorText: 'Invalid user input',
    errorDescription:
      'The provided user input is invalid or missing required fields. Please review and correct the input data.',
  },
  UNAUTHENTICATED: {
    errorText: 'Unauthorized request',
    errorDescription: 'Authentication is required to access this resource. Please provide valid credentials and try again.',
  },
  UNKNOWN: {
    errorText: 'Unknown error',
    errorDescription:
      'An unknown error occurred. Please contact support for further assistance and provide any available details.',
  },
  INVALID_REQUEST: {
    errorText: 'Invalid request',
    errorDescription:
      'The request is invalid or malformed. Please ensure you are sending a valid request according to the API documentation.',
  },
  SERVER_ERROR: {
    errorText: 'Internal server error',
    errorDescription: 'An internal server error has occurred. We apologize for the inconvenience. Please try again later.',
  },
  TIMEOUT: {
    errorText: 'Request timeout',
    errorDescription: 'The request has timed out. Please check your internet connection and try again.',
  },
  CONNECTION_ERROR: {
    errorText: 'Connection error',
    errorDescription: 'There was an error connecting to the server. Please check your network connection and try again.',
  },
  LIMIT_EXCEEDED: {
    errorText: 'Limit exceeded',
    errorDescription:
      'The limit for this resource has been exceeded. Please adjust your usage or upgrade your plan to increase the limit.',
  },
  INVALID_FORMAT: {
    errorText: 'Invalid format',
    errorDescription:
      'The data or input has an invalid format. Please provide the data in the correct format according to the API documentation.',
  },
  UNAVAILABLE: {
    errorText: 'Service unavailable',
    errorDescription:
      'The service is currently unavailable. Please try again later or contact support for further assistance.',
  },
  DUPLICATE_RESOURCE: {
    errorText: 'Duplicate resource',
    errorDescription:
      'A resource with the same identifier already exists. Please provide a unique identifier or modify the existing resource.',
  },
  INVALID_OPERATION: {
    errorText: 'Invalid operation',
    errorDescription:
      'The requested operation is not supported or allowed. Please review the API documentation for the correct operations.',
  },
  BAD_GATEWAY: {
    errorText: 'Bad gateway',
    errorDescription: 'There was a problem with the gateway or upstream server. Please try again later.',
  },
  SERVICE_ERROR: {
    errorText: 'Service error',
    errorDescription: 'An error occurred on the server side. We apologize for the inconvenience. Please try again later.',
  },
  NETWORK_ERROR: {
    errorText: 'Network error',
    errorDescription: 'A network error occurred. Please check your network connection and try again.',
  },
  INVALID_TOKEN: {
    errorText: 'Invalid token',
    errorDescription: 'The provided token is invalid or expired. Please provide a valid token to access the resource.',
  },
  PERMISSION_DENIED: {
    errorText: 'Permission denied',
    errorDescription:
      'You do not have the necessary permissions to access this resource. Please contact the administrator for access.',
  },
  INVALID_PERMISSION: {
    errorText: 'Invalid permission',
    errorDescription:
      'The permission associated with this action is invalid or not recognized. Please ensure you have the correct permission.',
  },
  INVALID_CREDENTIALS: {
    errorText: 'Invalid credentials',
    errorDescription: 'The provided credentials are invalid. Please verify your credentials and try again.',
  },
  INVALID_PARAMETER: {
    errorText: 'Invalid parameter',
    errorDescription: 'One or more parameters in the request are invalid. Please review the parameters and try again.',
  },
  DATA_ERROR: {
    errorText: 'Data error',
    errorDescription: 'An error occurred while processing or manipulating data. Please verify the data and try again.',
  },
}
