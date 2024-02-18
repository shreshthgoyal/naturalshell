import { GoogleGenerativeAI } from '@google/generative-ai';
import secureEnv from 'secure-env';

global.env = secureEnv({secret:'mySecretPassword'});

const log = console.log;
const { GEMINI_API_KEY } = global.env;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


export async function generateCommand(taskDescription) {
    const prompt = `Provide only the shell commands for linux for ${taskDescription}. Just provide the command in 1 line without any formatting or explaination.The command will be directly executed in a shell. For example, if I ask to display the message 'Hello, World!', you just output: echo "Hello, World!"`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // if(!shell.exec(`type ${text} &> /dev/null`))
    // {
    //   Promise.reject(``);
    // }
    return text;
  }
  