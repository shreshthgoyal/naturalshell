import { GoogleGenerativeAI } from '@google/generative-ai';
import { readApiKey } from './key.js';

export async function generateCommand(taskDescription) {

  const GEMINI_API_KEY = readApiKey();
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `You are an expert in shell scripting. Provide only the shell command that gives the output for the task: ${taskDescription}. Just provide the command in 1 line without any formatting or explaination and only one executable command that can be exectued on any system. The command will be directly executed. For example, if I ask: display the message 'Hello, World!', you just output: echo "Hello, World!"`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // if(!shell.exec(`type ${text} &> /dev/null`))
    // {
    //   Promise.reject(``);
    // }
    return text;
  }
  