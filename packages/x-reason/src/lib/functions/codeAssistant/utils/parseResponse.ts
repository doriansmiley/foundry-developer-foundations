export function parseLLMJSONResponse<T>(response: string): T {
  const text = (response ?? '').trim();
  const lines = text.split(/\r?\n/);

  // Assume structure:
  //   ```json
  //   ...json...
  //   ```
  const openIdx = lines.findIndex((l) =>
    l.trim().toLowerCase().startsWith('```json')
  );
  if (openIdx === -1) {
    throw new Error('JSON code fence ```json not found');
  }

  let closeIdx = -1;
  for (let i = lines.length - 1; i > openIdx; i--) {
    if (lines[i].trim() === '```') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) {
    throw new Error('Closing code fence ``` not found');
  }

  const jsonString = lines
    .slice(openIdx + 1, closeIdx)
    .join('\n')
    .trim();

  return JSON.parse(jsonString) as T;
}
