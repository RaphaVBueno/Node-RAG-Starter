# IA-assistant

Um template pronto para uso que implementa o padrão RAG (Retrieval-Augmented Generation). Crie chatbots e assistentes de IA que respondem com base em sua própria base de conhecimento de forma rápida e simples.

É necessário ter uma chave da API da OpenAI.

## 🚀 Funcionalidades

- Endpoint de API Pronto: Um servidor Express com uma rota `POST /chat` pronta para ser consumida.
- Base de Conhecimento Customizável: Alimente a IA com seus próprios dados através de um simples arquivo .csv.
- Busca por Similaridade: Utiliza embeddings e a biblioteca FAISS (via LangChain) para encontrar os trechos de informação mais relevantes para cada pergunta.
- Integração com OpenAI: Configurado para usar os modelos mais recentes da OpenAI, garantindo respostas de alta qualidade.

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Langchain**
- **OpenAI API**

## 📦 Instalação e Uso

### 1️⃣ Clone o repositório:

```sh
 git clone https://github.com/RaphaVBueno/IA-assistant.git
 cd IA-assistent
```

### 2️⃣ Instale as dependências:

```sh
 npm install
```

### 3️⃣ Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API OpenAI:

```ini
 OPENAI_KEY=your_api_key_here
```

### 4️⃣ Execute o servidor:

```sh
 npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

## 📡 Rotas da API

### 🔹 `POST /chat`

**Descrição:** Envia uma pergunta para a IA. (ela deve responder usando as informações do arquivo(_knowledge.csv_))

#### Exemplo de Requisição:

```json
{
  "message": "Qual o horário de funcionamento?"
}
```

## 📜 Licença

Este projeto está licenciado sob a MIT License

---

Feito por [Raphael V. Bueno](https://github.com/RaphaVBueno)
# Node-RAG-Starter
