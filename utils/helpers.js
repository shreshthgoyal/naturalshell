import inquirer from "inquirer";
import { readApiKey, saveApiKey } from "../lib/key.js";
import chalk from "chalk";
export function maskString(inputString, maskCharacter) {
  if (typeof inputString !== "string") {
    return inputString;
  }

  const startChars = inputString.substring(0, 2);
  const endChars = inputString.substring(inputString.length - 4);

  const middleMasked = maskCharacter.repeat(inputString.length - 6);

  return startChars + middleMasked + endChars;
}

export async function handleApiKey(options) {
  let apiKey = readApiKey(); // Assuming this function is defined elsewhere

  if (options.ms && apiKey) {
    apiKey = maskString(apiKey, "*"); // Assuming this function is defined elsewhere
    console.log("\n🔑 API key found:", apiKey + "\n");
    const useExistingKey = await promptForApiKey(
      "Do you want to use this key? (y/n)\n"
    );

    if (!["y", "yes"].includes(useExistingKey.toLowerCase())) {
      const newApiKey = await promptForApiKey(
        "🔑 Enter your new Gemini API key." +
          chalk.dim(
            " (You can get it from https://aistudio.google.com/app/apikey)\n"
          )
      );
      if (newApiKey) saveApiKey(newApiKey);
    }
  } else if (!apiKey || !options.ms) {
    const newApiKey = await promptForApiKey(
      "🔑 Enter your Gemini API key." +
        chalk.dim(
          " (You can get it from https://aistudio.google.com/app/apikey)\n"
        )
    );
    if (newApiKey) saveApiKey(newApiKey);
  }
  await exec(); // Assuming this function is defined elsewhere and should always be called at the end
}

export async function promptForApiKey(message) {
  const input = await inquirer.prompt({
    type: "input",
    name: "task",
    message,
  });
  return input.task;
}
