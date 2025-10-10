import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function useMarkdown() {
  return (content: string) => {
    // proposedChange contains raw markdown like ```typescript\n code \n```
    // Parse it with marked to get syntax-highlighted HTML
    const html = marked.parse(content) as string;

    const decodedHtml = html
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    return DOMPurify.sanitize(decodedHtml);
  };
}
