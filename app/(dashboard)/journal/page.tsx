import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link";

const getEntries = async () => {
    const user = await getUserUserByClerkId();
    
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            analysis: true
        }
    })

    return entries;
}

export default async function JournalPage() {
    const entries = await getEntries();

    return (
        <div className="p-10 bg-zinc-400/10 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="my-8">
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map((el) => {
                    return (
                        <Link key={el.id} href={`/journal/${el.id}`}>
                            <EntryCard entry={el}/>
                        </Link>
                    )
                })}
            </div>
        </div>
        
    )
}