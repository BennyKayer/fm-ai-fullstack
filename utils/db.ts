import { PrismaClient } from '@prisma/client'

// There is this globalThis thing in node
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
  }
  
// If it's not already attach, attach it
export const prisma =
    globalForPrisma.prisma ??
        new PrismaClient({
            // log: ['query'], // this will log each query to the console
        })

// Prevent Next.js from dying after 10 hot reloads
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma