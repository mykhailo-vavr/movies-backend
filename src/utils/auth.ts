import bcrypt from 'bcrypt';

export const hash = (password: string, saltRounds = 10) => bcrypt.hash(password, saltRounds);

export const validateHash = (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);
