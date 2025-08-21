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

export function cleanJsonString(src: string): string {
  let s = src.trim();

  // 1) Remove BOM & zero-width chars that can sneak in from LLMs
  s = s.replace(/^\uFEFF/, "").replace(/[\u200B-\u200D\u2060\uFEFF]/g, "");

  // 2) Normalize curly/smart quotes to straight quotes (rare but painful)
  s = s
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");

  // 3) Strip // line comments and /* block comments */ (not JSON, but models add them)
  s = s
    .replace(/(^|\s)\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  // 4) Remove trailing commas before } or ]  (the only comma fix we actually want)
  s = s.replace(/,\s*(?=[}\]])/g, "");

  // 5) Collapse obviously duplicated backslashes caused by over-escaping in some LLMs,
  //    but only when they escape a non-escape char (e.g., "\\ " or "\\#"). Legit escapes like `\\n` stay.
  s = s.replace(/\\(?!["\\/bfnrtu])/g, "");

  // 6) Trim again after edits
  return s.trim();
}
