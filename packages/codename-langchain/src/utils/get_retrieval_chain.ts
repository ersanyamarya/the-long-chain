import { RetrievalQAChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAI } from 'langchain/llms/openai'
import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression'
import { LLMChainExtractor } from 'langchain/retrievers/document_compressors/chain_extract'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'

/* The code `const textSplitter = new RecursiveCharacterTextSplitter({ ... })` is creating an instance
of the `RecursiveCharacterTextSplitter` class. This class is used to split text into smaller chunks
for processing. */
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
  separators: ['\n', ' ', '.', ',', ';', ':', '!', '?', '(', ')', '[', ']', '{', '}', '"', "'"],
  keepSeparator: false,
})

/**
 * The function `getRetrievalChain` takes a model, text, and embeddings as input and returns a
 * retrieval chain for question answering.
 * @param {OpenAI} model - The `model` parameter is an instance of the OpenAI language model that you
 * want to use for retrieval. It could be an instance of the GPT-3 model or any other model that
 * supports retrieval.
 * @param {string} text - The `text` parameter is the input text that you want to use for retrieval. It
 * can be a single sentence or a paragraph.
 * @param {OpenAIEmbeddings} embeddings - The "embeddings" parameter is an object that represents the
 * embeddings model used for encoding text into numerical vectors. It is used by the "vectorStore" to
 * create a vector representation of the input text.
 * @returns The function `getRetrievalChain` returns a `RetrievalQAChain` object.
 */
export async function getRetrievalChain(model: OpenAI, text: string, embeddings: OpenAIEmbeddings) {
  const baseCompressor = LLMChainExtractor.fromLLM(model)

  const docs = await textSplitter.createDocuments([text])

  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings)

  const retriever = new ContextualCompressionRetriever({
    baseCompressor,
    baseRetriever: vectorStore.asRetriever(),
  })
  const chain = RetrievalQAChain.fromLLM(model, retriever)
  return chain
}
