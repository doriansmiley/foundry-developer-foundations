/* JSX */
/* @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

/*
data type
approved
: 
false
file
: 
"/Users/przemek/Projects/foundry-developer-foundations/apps/cli-tools/spec-775018ac-25fc-4fe9-b98a-137b20806962.md"
messages
: 
[{system: "Please review the spec file."}]
reviewRequired
: 
true
*/
type DataType = {
  approved: boolean;
  file: string;
  messages: {system?: string, user?: string}[];
  reviewRequired: boolean;
}

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
