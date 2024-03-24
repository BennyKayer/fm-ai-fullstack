import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const createNewUser = async () => {
    try {
        const clerkUser = await currentUser();
        if (!clerkUser) {
            throw new Error(`clerkUser is ${clerkUser}`)
        }

        const { id: clerkId, emailAddresses } = clerkUser
        if (!emailAddresses.length){
            throw new Error(`emailAdresses are empty, email is required`)
        }

        const match = await prisma.user.findUnique({
            where: {
                clerkId
            }
        })
        if (!match){
            await prisma.user.create({
                data: {
                    clerkId,
                    email: clerkUser.emailAddresses[0].emailAddress
                }
            })
        }
        redirect("/journal")
    } catch (error) {
        console.error(error)
    }
    
}

export default async function NewUserPage() {
    await createNewUser()

    return (
        <div>
            Loading...
        </div>
    )
}