import crypto from 'crypto';

// Simple hash function for dummy passwords (since your DB uses SHA256)
export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Verify password
export const verifyPassword = (inputPassword: string, storedHash: string): boolean => {
  const hashedInput = hashPassword(inputPassword);
  return hashedInput === storedHash;
};