import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';
import inquirer from 'inquirer';
import readline from 'readline';
import shell from 'shelljs';
import { readApiKey } from './key.js';


  export async function editCommand(command) {
    const GEMINI_API_KEY = readApiKey();
const log = console.log;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

    const clearLine = '\u001b[2K';
    const moveToStartOfLine = '\u001b[0G';
    let buffer = command;
    log(`Edit the command`);
    process.stdout.write(buffer);

    process.stdin.on('keypress', (chunk, key) => {
      if (key && key.ctrl && key.name === 'c') {
        process.exit();
      } else if (key && key.name === 'backspace') {
        buffer = buffer.slice(0, -1);
        process.stdout.write(`${clearLine}${moveToStartOfLine}${buffer}`);
      } else if (key && key.name === 'return') {
        rl.close();
      } else {
        buffer += chunk;
      }
    });
    rl.on('close', async () => {
      let answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: chalk.bold('Execute the command?'),
          choices: [
            (chalk.bold.greenBright(`Yes    `)+chalk.dim(`${buffer} will be executed.`)),
            chalk.bold.redBright('No'),
          ],
        },
      ])

      if(answer.choice === (chalk.bold.greenBright(`Yes    `)+chalk.dim(`${buffer} will be executed.`))) {
        shell.exec(buffer);
      }
      else
      {
        process.exit(0);
      }
      process.stdin.setRawMode(false);
    });
  }