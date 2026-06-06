require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in .env');
}
const ai = new GoogleGenAI({ apiKey });

async function analyzePapers(text) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Act as a Senior Equity Research Analyst specializing in Indian Defense and PSU stocks. I am a long-term retail investor (3–5 year horizon) looking for sustainable capital appreciation. Please provide a comprehensive investment analysis\n\n${text}`,
  });
  return response.text ?? 'No analysis generated.';
}

async function analyzePapersStream(text, onChunk) {
  const stream = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: `Act as a Senior Equity Research Analyst specializing in Indian Defense and PSU stocks. I am a long-term retail investor (3–5 year horizon) looking for sustainable capital appreciation. Please provide a comprehensive investment analysis\n\n${text}`,
  });

  for await (const chunk of stream) {
    const chunkText = chunk.text ?? '';
    if (chunkText && onChunk) onChunk(chunkText);
  }
}

module.exports = {
  ai,
  analyzePapers,
  analyzePapersStream
};
