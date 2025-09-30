/* JSX */
/* @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

// Configure marked with highlight.js
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function ConfirmUserIntent({ data, id }: { data: {confirmationPrompt: string}, id: string }) {
  const confirmationPrompt = data.confirmationPrompt;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && confirmationPrompt) {
      // Parse markdown and sanitize HTML
      const rawHtml = marked.parse(confirmationPrompt) as string;
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      contentRef.current.innerHTML = sanitizedHtml;
    }
  }, [confirmationPrompt]);

  return (
    <div className="confirm-user-intent">
      <div 
        ref={contentRef}
        className="markdown-content markdown-body"
      />
    </div>
  );
}
