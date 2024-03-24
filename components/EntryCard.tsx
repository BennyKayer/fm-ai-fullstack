import { Analysis, JournalEntry } from "@prisma/client"
// TODO: Check prisma include types
type JournalWithAnalysis = { 
    analysis: Analysis | null
} & JournalEntry;

type EntryCardProps = {
    entry: JournalWithAnalysis
}
export default function EntryCard({ entry }: EntryCardProps) {
    const date = new Date(entry.createdAt).toDateString()

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">{date}</div>
        <div className="px-4 py-5 sm:p-6">{entry.analysis?.summary}</div>
        <div className="px-4 py-4 sm:px-6">{entry.analysis?.mood}</div>
        </div>
    )
}