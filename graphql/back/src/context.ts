import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma,
}

/* export async function contextResolver(ctx: Context): Promise<Contex> {
  context.db = prisma
} */
