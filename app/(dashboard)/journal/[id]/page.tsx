import Editor from "@/components/Editor";
import { getUserUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
    const user = await getUserUserByClerkId();
    const entry = await prisma.journalEntry.findUniqueOrThrow({
        where: {
            userId_id: { // Search by compound unique constraint
                userId: user.id,
                id
            }
        },
        include: {
            analysis: true
        }
    })

    return entry
}

type EntryPageProps = {
    params: {
        id: string;
    }
}
export default async function EntryPage({ params }: EntryPageProps) {
    const entry = await getEntry(params.id);
   
    return (
        <div className="w-full h-full">
            <Editor entry={entry}/>
        </div>
    )
}