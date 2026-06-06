# Revoult.ai

AI-powered research analysis backend. Send text (questions, notes, or paper excerpts) and get structured analysis powered by Google Gemini.

## Features

- **REST API** — `POST /analyze-paper` accepts text and returns a full AI analysis
- **Streaming support** — `analyzePapersStream` streams Gemini responses chunk-by-chunk (see terminal test below)
- **CORS enabled** — ready for a React frontend to call the API
- **PDF-ready dependencies** — `pdf-parse` and `multer` are included for future PDF upload support

## Tech Stack

- Node.js 18+ (recommended: 22 via `.nvmrc`)
- Express 5
- [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini 2.5 Flash)
- Jest + Supertest (testing)

## Project Structure

```
revoult.ai/
├── backend/
│   ├── index.js          # Gemini client, analyzePapers & analyzePapersStream
│   ├── server.js         # Express API server
│   ├── test-stream.js    # Streams AI output to the terminal
│   ├── package.json
│   └── .nvmrc            # Node version (22)
├── test.rest             # Sample HTTP requests (REST Client extension)
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher (use [nvm](https://github.com/nvm-sh/nvm) if you have it)
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini

## Setup

1. **Clone the repo** (or navigate to the project folder)

2. **Use the correct Node version**

   ```bash
   cd backend
   nvm use
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create a `.env` file** in `backend/`:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   Get your key from [Google AI Studio](https://aistudio.google.com/apikey).

## Running the Server

**Development** (auto-restarts on file changes):

```bash
cd backend
npm run dev
```

**Production:**

```bash
cd backend
npm start
```

The server runs at `http://localhost:3000`.

## API

### `POST /analyze-paper`

Analyze text and return a complete response.

**Request**

```http
POST http://localhost:3000/analyze-paper
Content-Type: application/json

{
  "textinput": "Your questions or paper text here"
}
```

**Success (200)**

```json
{
  "analysis": "AI-generated analysis..."
}
```

**Error (400)** — missing `textinput`:

```json
{
  "msg": "please enter the questions"
}
```

**Error (500)** — server or Gemini API failure:

```json
{
  "msg": "something went wrong"
}
```

You can also use the included `test.rest` file with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm start` | Start server |
| `npm test` | Run Jest tests |
| `npm run test:stream` | Stream a Gemini response to the terminal |

### Stream test

Streams analysis to your terminal in real time:

```bash
cd backend
npm run test:stream
```

Edit the sample questions in `backend/test-stream.js` to try different prompts.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |

## License

ISC
