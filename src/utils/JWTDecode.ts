import { User } from '../types/types';

export const decodeJWTPayload = (token: string): User => {
  const base64Payload = token.split('.')[1];
  return JSON.parse(window.atob(base64Payload));
};
