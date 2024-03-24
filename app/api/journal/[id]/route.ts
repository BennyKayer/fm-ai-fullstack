import { getUserUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

type JournalParams = {
    params: {
        id: string;
    }
}
export const PATCH = async (request: Request, { params }: JournalParams) => {
    const { content } = await request.json();

    const user = await getUserUserByClerkId();
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content
        }
    })

    return NextResponse.json({data: updatedEntry})
}