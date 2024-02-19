import { GoogleGenerativeAI } from '@google/generative-ai';
import inquirer from 'inquirer';
import { readApiKey } from './key.js';
import { oraPromise } from 'ora';
import chalk from 'chalk';


export async function clearDoubt(command) {
  const GEMINI_API_KEY = readApiKey();

const log = console.log;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const help = await inquirer.prompt({
      type: 'input',
      name: 'task',
      message: 'Drop a question.',
    });

    const prompt = `Act as an expert shell user. Provie a crisp explaination in 2 short bullet points for my task : ${help.task} in the context of shell commands in context of the command: ${command}. Focus more on ${help.task} rather than ${command} while answering this prompt. Keep it short and at the end provide some documentation that I can refer to solve if I have more doubts. Keep this as short and crisp as possible. With at max 3 sentences (2 for 2 bullet points, and 1 for external reference).`

    const result = await oraPromise(model.generateContent(prompt), {text : chalk.bold.cyanBright('🔍 Finding answers!'), failText: chalk.bold.red(`Invalid Request. Try again later!`)});
    const response = await result.response;
    const text = response.text();
    log(`${text}`);
  }
