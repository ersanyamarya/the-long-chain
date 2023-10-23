import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { logger } from '../logger'
import { getRetrievalChain } from '../utils'

const summarizeTemplatePrompt = `I want the following document to be summarized with context: {objective}.
The summary should be at least 500 words long.
Don't skip any important details. Keep the names of any people, places, things or companies mentioned in the document.
Importantly, Try to answer the following question in the summary:
{question}
`
/* The line `const promptTemplate = new PromptTemplate({ template: summarizeTemplatePrompt,
inputVariables: ['objective', 'question'] })` is creating a new instance of the `PromptTemplate`
class. */
const promptTemplate = new PromptTemplate({
  template: summarizeTemplatePrompt,
  inputVariables: ['objective', 'question'],
})

/* The `export interface SummarizeInputType` is defining a TypeScript interface that describes the
structure of an object used as input for the `getSummaryFromTextAndObjective` function. */
export interface SummarizeInputType {
  objective: string
  question: string
  model: OpenAI
  embeddings: OpenAIEmbeddings
}

/**
 * The function `getSummaryFromTextAndObjective` takes in a text and an object containing an objective,
 * question, model, and embeddings. It retrieves a retrieval chain using the model and embeddings,
 * prompts a template with the objective and question, and calls the retrieval chain with the query.
 * The function then returns the resulting text.
 * @param {string} text - The `text` parameter is a string that represents the input text that you want
 * to summarize.
 * @param {SummarizeInputType}  - - `text`: The input text that needs to be summarized.
 * @returns The function `getSummaryFromTextAndObjective` returns a Promise that resolves to a string.
 */
export async function getSummaryFromTextAndObjective(
  text: string,
  { objective, question, model, embeddings }: SummarizeInputType
): Promise<string> {
  logger.info('----------------- Summarize: Starting ----------------- ')
  const chain = await getRetrievalChain(model, text, embeddings)
  const query = await promptTemplate.format({ objective, question })
  const res = await chain.call({
    query,
  })
  logger.info('----------------- Summarize: Done ----------------- ')
  return res.text
}
