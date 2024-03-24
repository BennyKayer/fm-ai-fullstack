import { UserButton } from "@clerk/nextjs"
import { PropsWithChildren } from "react"

type DashboardLayoutProps = PropsWithChildren<{
}>
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-screen w-screen relative">
            <aside className="absolute top-0 left-0 h-full border-r border-black/10 w-[200px]">
                Mood
            </aside>
            <div className="ml-[200px] h-full">
                <header className="h-[60px] border-b border-black/10">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <div className="h-[calc(100vh-60px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}