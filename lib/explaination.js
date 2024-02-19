import { GoogleGenerativeAI } from '@google/generative-ai';
import { readApiKey } from './key.js';

export async function generateExplaination(command) {
  const GEMINI_API_KEY = readApiKey();
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `Provide only the explaination for the shell command ${command}. Provide the explaination in at max 5 bullet points (with ordered bullets) with 1 sentence each. (Use as less bullet points as possible). Break line after bullet point. Dont output anything except these bullet points. Number of sentences in response should be equal to number of bullet points. Break a line after each bullet point`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  