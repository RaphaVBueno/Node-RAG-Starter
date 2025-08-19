import 'dotenv/config'
import express, { Request } from 'express'
import OpenAI from 'openai'

import { OpenAIEmbeddings } from '@langchain/openai'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 3000

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})

async function initializeVectorStore() {
  const loader = new CSVLoader('./knowledge.csv') //leitura do arquivo de conhecimento
  const docs = await loader.load()

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-large',
    openAIApiKey: process.env.OPENAI_KEY,
  })

  return FaissStore.fromDocuments(docs, embeddings) //criação do vector store(base de dados salvo em memoria)
}

async function startServer() {
  const vectorStore = await initializeVectorStore()

  async function chat(req: Request, res: any) {
    const { message } = req.body

    const busca = await vectorStore.similaritySearch(message, 3) //busca na vector store informações que podem ser semelhantes a message, o número indica a quantidade de informações que serão buscadas e usadas para gerar a resposta

    const context = busca.map((doc) => doc.pageContent).join('\n---\n')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente virtual especialista, projetado para responder perguntas de forma precisa e objetiva, utilizando **exclusivamente** um conjunto de informações fornecidas a você como contexto. Sua principal missão é ser uma fonte de informação confiável e direta.', //instruções do perfil e como a IA deve se comportar
        },
        {
          role: 'user',
          content: `Com base nas informações a seguir, responda à pergunta do usuário.Pergunta do usuário: " ${message} " Informações de contexto: ${context}`, //mensagem do usuário e o contexto fornecido para gerar a resposta
        },
      ],
    })

    const reply = completion.choices[0].message.content

    return res.json({ answer: reply })
  }

  app.post('/chat', chat)

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
  })
}

startServer().catch(console.error)
