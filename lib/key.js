import fs from 'fs';

const apiKeyFilePath = 'api_key.json';

export function saveApiKey(apiKey) {
  const apiKeyData = { apiKey: apiKey };
  fs.writeFileSync(apiKeyFilePath, JSON.stringify(apiKeyData));
}

export function readApiKey() {
  try {
    const data = fs.readFileSync(apiKeyFilePath, 'utf8');
    const apiKeyData = JSON.parse(data);
    return apiKeyData.apiKey;
  } catch (err) {
    return null;
  }
}