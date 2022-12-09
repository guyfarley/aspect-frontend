import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;

// import { PrismaClient } from '@prisma/client';

// // instantiates one instance of prisma to be used across entire app

// declare global {
//   const prisma: PrismaClient | undefined
// }

// export const prisma =
//   global.prisma ||
//   new PrismaClient();

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;