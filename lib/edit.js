import chalk from 'chalk';
import inquirer from 'inquirer';
import readline from 'readline';
import shell from 'shelljs';

  let log = console.log;

  export async function editCommand(command) {
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

    let cursorPosition = buffer.length;

    process.stdin.on('keypress', (chunk, key) => {
      if (key && key.ctrl && key.name === 'c') {
        process.exit();
      } else if (key && key.name === 'backspace') {
        if (cursorPosition > 0) {
          buffer = buffer.slice(0, cursorPosition - 1) + buffer.slice(cursorPosition);
          cursorPosition--;
          process.stdout.write(`${clearLine}${moveToStartOfLine}${buffer}`);
          process.stdout.write(`\x1b[${cursorPosition + 1}G`); 
        }    
      } else if (key && key.name === 'delete') {
        if (cursorPosition < buffer.length) {
          buffer = buffer.slice(0, cursorPosition) + buffer.slice(cursorPosition + 1);
          process.stdout.write(`${clearLine}${moveToStartOfLine}${buffer}`);
          process.stdout.write(`\x1b[${cursorPosition + 1}G`); 
        }
      }
        else if (key && key.name === 'return') {
        rl.close();
      } else if (key && key.name === 'right') {
        // Move cursor right
        if (cursorPosition < buffer.length) {
          cursorPosition++;
          process.stdout.write("\x1b[1C"); // Move right
        }
      } else if (key && key.name === 'left') {
        // Move cursor left
        if (cursorPosition > 0) {
          cursorPosition--;
          process.stdout.write("\x1b[1D"); // Move left
        }
      } else {
        buffer = buffer.slice(0, cursorPosition) + chunk + buffer.slice(cursorPosition);
        cursorPosition++;
        process.stdout.write(`${clearLine}${moveToStartOfLine}${buffer}`);
        process.stdout.write(`\x1b[${cursorPosition + 1}G`);
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