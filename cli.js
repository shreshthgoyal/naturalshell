#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import { Command } from 'commander';
import { oraPromise } from 'ora';
import shell from 'shelljs';
import { confirmAndExecuteCommand } from './lib/execute.js';
import { generateExplaination } from './lib/explaination.js';
import { generateCommand } from './lib/generator.js';

const program = new Command();

const log = console.log;

program
  .version("0.0.1")
  .description("Natural Language in your Shell")
  .option("-m, --ms  <value>", "task message that you wont to perform")
  .parse(process.argv);

const options = program.opts();


async function main() {  
  const [,,argv] = process.argv
  if(!argv)
  {
    shell.exec("ns --help");
    process.exit();
  }

  else if(argv[0] != '-')
  {
    console.error(`error: unknown option ${process.argv.slice(2).join(' ')}. Try 'ns --help' for help`)
  }

  else
  {
  log(`\n${chalk.bold(boxen("Natural Shell", {padding: 1, borderStyle: 'round'}))}\n`)
  }

  if(options.ms){
  
  const task = options.ms;
  const command = await oraPromise(generateCommand(task), {successText : chalk.bold.greenBright('🍜 Bon appétit!'), text : chalk.bold.cyanBright('👨‍🍳 Cooking up a script for you.'), failText: chalk.bold.red(`Invalid Request. Try again later!`)});

  log(`\nGenerated command:\n\n${chalk.underline.bold(command)}\n`);
  const lines = await oraPromise(generateExplaination(command), {successText : chalk.bold.greenBright('🧠 Insights Dropped'), text : chalk.bold.cyanBright(`🔐 Unlocking information`), failText: chalk.bold.red('Oops, try again later!')});
  
  if(lines.length > 1)
  {console.groupCollapsed("\nExplaination")
   console.log(lines)
  console.log("\n");}

  else
  {
    console.log("\nFor docuementation refer to the following link: https://devdocs.io/bash/")
  }

  await confirmAndExecuteCommand(command);
  }
}

main().catch(console.error);
