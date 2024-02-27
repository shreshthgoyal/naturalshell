import fs from 'fs';
import path from 'path';

 
const apiKeyFilePath = path.resolve('api_key.json');
console.log(apiKeyFilePath);
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