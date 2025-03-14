import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { PropsWithChildren } from "react"

const links = [
    { href: "/", label: "Home"},
    { href: "/journal", label: "Journal"},
    { href: "/history", label: "History"}
]

type DashboardLayoutProps = PropsWithChildren<{
}>
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-screen w-screen relative">
            <aside className="absolute top-0 left-0 h-full border-r border-black/10 w-[200px]">
                <div>Mood</div>
                <ul>
                    {links.map(el => {
                        return (
                            <li key={el.href} className="px-2 py-6 text-xl">
                                <Link href={el.href}>
                                    {el.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
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