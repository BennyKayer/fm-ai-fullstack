'use client'

import { FormHTMLAttributes, InputHTMLAttributes, useState } from 'react'

export default function Question() {
    const [value, setValue] = useState("")
    const onChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
        setValue(e.target.value)
    }
    
    const handleSubmit: FormHTMLAttributes<HTMLFormElement>["onSubmit"] = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={value} onChange={onChange} type="text" name="question" id="question" placeholder="Ask a question" className='border border-black/20 px-4 py-6 text-lg rounded-lg'/>
                <button type='submit' className='bg-blue-400 px-2 py-2 rounded-lg text-lg'>Ask</button>
            </form>
        </div>
    )
}