import { analyze } from "@/utils/ai";
import { getUserUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
    const user = await getUserUserByClerkId();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "Write your content here!",
        }
    })
    const analysis = await analyze(entry.content)
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            ...analysis
        }
    })

    // So the UI knows the entries changed and it doesn't render the one from before the update
    // this alone won't do
    revalidatePath('/journal')

    return NextResponse.json({ data: entry })
}