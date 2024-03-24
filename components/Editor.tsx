'use client'

import { updateEntry } from "@/utils/api"
import { JournalEntry } from "@prisma/client"
import { TextareaHTMLAttributes, useState } from "react"
import { useAutosave } from "react-autosave"

type EditorProps = {
    entry: JournalEntry
}
export default function Editor({ entry }: EditorProps) {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false);

    useAutosave({
        data: value,
        onSave: async (val) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, val)
            setIsLoading(false)
        }
    })

    const handleOnChange: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className="w-full h-full">
            {isLoading && (<div>Loading...</div>)}
            <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={handleOnChange}/>
        </div>
    )
}