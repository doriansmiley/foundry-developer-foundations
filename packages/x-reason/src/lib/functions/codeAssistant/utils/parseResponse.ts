export function parseLLMJSONResponse<T>(response: string): T {
  let jsonString = response.trim();
  const jsonBlockMatch = jsonString.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    jsonString = jsonBlockMatch[1].trim();
  }

  return JSON.parse(jsonString) as T;
}
