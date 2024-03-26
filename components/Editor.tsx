'use client'

import { updateEntry } from "@/utils/api"
import { Analysis, JournalEntry } from "@prisma/client"
import { TextareaHTMLAttributes, useState } from "react"
import { useAutosave } from "react-autosave"

type EditorProps = {
    entry: JournalEntry & { analysis: Analysis | null }
}
export default function Editor({ entry }: EditorProps) {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false);
    const [editorEntry, setEditorEntry] = useState(entry);

    const analysisData = [
        {
            name: "Summary",
            value: editorEntry.analysis?.summary
        },
        {
            name: "Subject",
            value: editorEntry.analysis?.subject
        },
        {
            name: "Mood",
            value: editorEntry.analysis?.mood
        },
        {
            name: "Negative",
            value: editorEntry.analysis?.isNegative ? "True" : "False"
        },
    ]

    useAutosave({
        data: value,
        onSave: async (val) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, val)
            setEditorEntry(updated);
            setIsLoading(false)
        }
    })

    const handleOnChange: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                {isLoading && (<div>Loading...</div>)}
                <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={handleOnChange}/>
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{backgroundColor: editorEntry.analysis?.color}}>
                    <h2 className="text-2xl">Analyis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map(el => {
                            return (
                                <li className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10" key={el.name}>
                                    <span className="text-lg font-semibold">{el.name}</span>
                                    <span>{el.value}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}