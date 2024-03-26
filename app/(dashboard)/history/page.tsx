import HistoryChart from "@/components/HistoryChart";
import { getUserUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserUserByClerkId();
    const analyses = await prisma.analysis.findMany({
        where: {
            entry: {
                userId: user.id
            }
        }
    })

    const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0)
    const avg = Math.round(sum / analyses.length)
    return { analyses, avg }
}

export default async function HistoryPage() {
    const { analyses, avg } = await getData();

    return (
        <div className="w-full h-full">
            <div>{`Avg. Sentiment ${avg}`}</div>
            <HistoryChart data={analyses} />
        </div>
    )
}