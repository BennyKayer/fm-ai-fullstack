import { auth } from "@clerk/nextjs"
import { prisma } from "@/utils/db"

export const getUserUserByClerkId = async () => {
    try {
        const { userId } = auth()
        if (!userId){
            throw new Error(`userId is ${userId}`)
        }
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                clerkId: userId
            },
        })
        return user;
    } catch (error) {
        console.error(error);
    }
    
}