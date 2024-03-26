import { z } from 'zod'
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { PromptTemplate } from '@langchain/core/prompts'
import { JournalEntry } from '@prisma/client'
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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

// He mentioned that he used this as a foundation for a crawler
// crawl through whole next.js scrape all the links vectorize everything and I have a search for a whole website
export const qa = async (question: string, entries: Pick<JournalEntry, "content" | "id" | "createdAt">[]) => {
    const docs = entries.map(
        (entry) =>
          new Document({
            pageContent: entry.content,
            metadata: { source: entry.id, date: entry.createdAt },
          })
      )
      const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
      const chain = loadQARefineChain(model)
      const embeddings = new OpenAIEmbeddings()
      const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
      const relevantDocs = await store.similaritySearch(question)
      const res = await chain.call({
        input_documents: relevantDocs,
        question,
      })
    
      return res.output_text
}