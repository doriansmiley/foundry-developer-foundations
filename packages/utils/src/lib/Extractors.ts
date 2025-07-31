export function extractJsonFromBackticks(text: string): string {
  // Regex101: https://regex101.com/r/hst7tJ/1
  const regex = /```(?:json)?\s*([\s\S]+?)```/;
  const match = text.match(regex);
  return match ? match[1].trim() : text;
}

export function extractHtmlFromBackticks(text: string): string {
  const regex = /```(?:html)?\s*([\s\S]+?)```/;
  const match = text.match(regex);
  return match ? match[1].trim() : text;
}
