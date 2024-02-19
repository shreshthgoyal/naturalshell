import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const apiKeyFilePath = path.join(__dirname,'api_key.json');

export function saveApiKey(apiKey) {
  const apiKeyData = { NSH_API_KEY: apiKey };
  fs.writeFileSync(apiKeyFilePath, JSON.stringify(apiKeyData));
}

export function readApiKey() {
  try {
    const data = fs.readFileSync(apiKeyFilePath, 'utf8');
    const apiKeyData = JSON.parse(data);
    return apiKeyData.NSH_API_KEY;
  } catch (err) {
    return null;
  }
}