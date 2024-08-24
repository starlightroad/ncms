import { compare, hash } from 'bcrypt';

export const comparePasswords = async (password: string, hashedPassword: string) => {
  const passwordsMatch = await compare(password, hashedPassword);
  return passwordsMatch;
};

export const saltAndHashPassword = async (password: string) => {
  return await hash(password, 10);
};
