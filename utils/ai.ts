import { z } from 'zod'
import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe("Mood of the journal entry f.e. Positive, Negative, Elated, Depressed etc."),
        summary: z.string().describe("Short summary of the journal entry"),
        color: z.string().describe("Hexadecimal for the journal header background it should be based on mood"),
        isNegative: z.boolean().describe("Whether the tone of the journal entry is negative or not"),
        subject: z.string().describe("Subject of the journal entry.")
    })
)

const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Answer the users question as best as possible.\n{format_instructions}\n{question}"
    ),
    new OpenAI({ temperature: 0 }),
    parser,
]);

export const analyze = async (prompt: string) => {
    const result = await chain.invoke({
        question: prompt,
        format_instructions: parser.getFormatInstructions()
    })
    return result;
}