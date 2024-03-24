import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntries = async () => {
    const user = await getUserUserByClerkId();
    
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return entries;
}

export default async function JournalPage() {
    const entries = await getEntries();

    return (
        <div className="p-10 bg-zinc-400/10 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map((el) => {
                    return (
                        <EntryCard key={el.id} entry={el}/>
                    )
                })}
            </div>
        </div>
        
    )
}