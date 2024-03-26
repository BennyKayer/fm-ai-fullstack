'use client'

import { askQuestion } from '@/utils/api'
import { FormHTMLAttributes, InputHTMLAttributes, useState } from 'react'

export default function Question() {
    const [value, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false); 
    const [response, setResponse] = useState('')
    const onChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (e) => {
        setValue(e.target.value)
    }
    
    const handleSubmit: FormHTMLAttributes<HTMLFormElement>["onSubmit"] = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
        setIsLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input disabled={isLoading} value={value} onChange={onChange} type="text" name="question" id="question" placeholder="Ask a question" className='border border-black/20 px-4 py-4 text-lg rounded-lg'/>
                <button disabled={isLoading} type='submit' className='bg-blue-400 px-4 py-4 rounded-lg text-lg ml-2'>Ask</button>
            </form>
            {isLoading && (<div>Loading...</div>)}
            {response && (<div>{response}</div>)}
        </div>
    )
}