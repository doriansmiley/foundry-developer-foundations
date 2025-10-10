import { useEffect, useState } from 'preact/hooks';
import { onMessage, postMessage } from '../lib/vscode';

export function useContentFromLocalFile(filePath: string) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = onMessage((msg: any) => {
      if (msg.type === 'fileContent' && msg.filePath === filePath) {
        setContent(msg.content);
      }
    });

    postMessage({
      type: 'readFile',
      filePath,
    });

    return cleanup;
  }, [filePath]);

  return { content };
}
