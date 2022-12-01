import { PrismaClient } from '@prisma/client'

// instantiates one instance of prisma to be used across entire app

declare global {
  const prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma