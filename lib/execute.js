import chalk from 'chalk';
import inquirer from 'inquirer';
import shell from 'shelljs';
import { clearDoubt } from './doubt.js';
import { editCommand } from './edit.js';

export async function confirmAndExecuteCommand(command) {

    let answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: chalk.bold('Execute the command?'),
          choices: [
            (chalk.bold.greenBright(`✅ Yes    `)+chalk.dim(`${command} will be executed.`)),
            chalk.bold.magenta(`📝 Edit the command`),
            chalk.bold.blueBright(`🧠 Need some assistance`),
            chalk.bold.redBright('❌ No'),
          ],
        },
      ])


  if(answer.choice === (chalk.bold.greenBright(`✅ Yes    `)+chalk.dim(`${command} will be executed.`))) {
    shell.exec(command);
  } else if(answer.choice === chalk.bold.magenta('📝 Edit the command')) {
    await editCommand(command);
  }
  else if(answer.choice === chalk.bold.blueBright('🧠 Need some assistance')) {
    await clearDoubt(command);
  }
  else
  {
    process.exit(0);
  }
}
