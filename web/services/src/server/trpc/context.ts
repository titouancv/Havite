import { prisma } from "../db";

export const createContext = () => ({
  prisma,
});

export type Context = ReturnType<typeof createContext>;
