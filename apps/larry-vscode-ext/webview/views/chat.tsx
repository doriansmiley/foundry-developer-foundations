/** @jsx h */
import { useEffect, useState, useMemo, useRef } from 'preact/hooks';
import { h } from 'preact';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import { Message } from '../../src/types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function useMarkdown(md: string) {
	return useMemo(() => {
		marked.setOptions({ gfm: true, breaks: true });
		const html = marked.parse(md) as string;
		return DOMPurify.sanitize(html);
	}, [md]);
}

function MessageComponent({ message }: { message: Message }) {
	const isLarryProduced = (message?.system && message?.system !== 'Thinking') && message?.user;

	const messageContent = isLarryProduced ? message?.system : '';
	const html = useMarkdown(messageContent || '');
	const ref = useRef<HTMLDivElement>(null);
	const isLoading = message?.system === 'Thinking';

	useEffect(() => {
		if (!ref.current || isLoading) return;
		ref.current.querySelectorAll('pre code').forEach((el: any) => hljs.highlightElement(el));
	}, [html, isLoading]);

	if (!isLarryProduced) return (
		<div className="Box p-2">
			<div className="color-fg-muted mb-1"><b>You:</b></div>
			<div>{message?.user}</div>

			{isLoading && (
				<div>
					<div className="color-fg-muted mb-1">
				<b>Larry:</b>
			</div>
				<div className="color-fg-muted mb-1">
					<b>Thinking<div className="AnimatedEllipsis" /></b>
				</div>
					</div>
			)}
		</div>
	);
	
	return (
		<div className="Box p-2" ref={ref as any}>
			<div className="color-fg-muted mb-1">
				<b>Larry:</b>
			</div>
			{!isLoading && (
				<div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
			)}
		</div>
	);
}

export function Chat({originalTask, vscode, currentWorktreeId, goBackToSessions, sessionId, onLeaveWorktree}: {originalTask: string, vscode: any, currentWorktreeId?: string, goBackToSessions: () => void, sessionId: string, onLeaveWorktree: () => void}) {
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const m = (e as any).data;
			console.log(m);
      if (m?.type === 'messagesLoaded') {
				m.messages[m.messages.length - 1].system = m.messages[m.messages.length - 1]?.system || 'Thinking';
        setMessages(m.messages);
      }
    };
    window.addEventListener('message', onMsg as any);
		return () => window.removeEventListener('message', onMsg as any);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  	// Load messages for a conversation via VS Code extension
	const loadMessages = async (sessionId: string) => {
		try {
			vscode.postMessage({ 
				type: 'loadMessages', 
				sessionId: sessionId 
			});
		} catch (error) {
			console.error('Error loading messages:', error);
			return [];
		}
	};

	// Polling for new messages
	useEffect(() => {
		const pollInterval = setInterval(async () => {
			if (sessionId) {
				try {
					await loadMessages(sessionId);
				} catch (error) {
					console.error('Polling error:', error);
				}
			}
		}, 2000);

		return () => clearInterval(pollInterval);
	}, [sessionId]);

  async function leaveWorktree() {
		// Stop Larry server in Docker
		if (sessionId) {
			vscode.postMessage({
				type: 'stopLarryServer',
				sessionId: sessionId
			});
		}
		
		vscode.postMessage({ type: 'leaveWorktree' });	
		setMessages([]);
    onLeaveWorktree();
	}

	async function send(e: Event) {
		e.preventDefault();
		const val = (inputRef.current as any)?.value?.trim?.() || '';
		if (!val) return;

		setMessages(prev => [...prev, {user: val, system: 'Thinking'}, ]);
		if (inputRef.current) (inputRef.current as any).value = '';

		// Send message to VS Code extension for processing and database storage
		vscode.postMessage({ 
			type: 'sendMessage', 
			sessionId: sessionId,
			message: {
        user: val,
				system: undefined,
      } 
		});
	}

  return (<div>
  <div className="p-1 d-flex flex-justify-between flex-items-center mb-2">
					<div className="f4 text-bold">
						{currentWorktreeId ? `Worktree: ${currentWorktreeId}` : 'Chat Session'}
					</div>
					<div className="d-flex gap-2">
						{!currentWorktreeId && (
							<button className="btn" onClick={goBackToSessions}>Sessions</button>
						)}
						{currentWorktreeId ? (
							<button className="btn" onClick={leaveWorktree}>Leave worktree</button>
						) : (
							<button className="btn" onClick={goBackToSessions}>Back to Sessions</button>
						)}
					</div>
				</div>
				<div id="log" className="p-1 d-flex flex-column gap-2 mb-2 messages">
					<h5>Original Task: {originalTask}</h5>

					{messages.length === 0 && (
						<div className="color-fg-muted">
							<b>Larry:</b>
							<div className="color-fg-muted">Thinking<div className="AnimatedEllipsis" /></div>
						</div>
					)}

					{messages.map((m, i) => (
						<MessageComponent key={i} message={m} />
					))}
				</div>
				<form onSubmit={send} className="composer p-1">
					<div className="form-group d-flex">
						<input ref={inputRef} className="form-control flex-1 mr-2" placeholder="Type a message..." />
						<button className="btn btn-primary btn-icon p-1" type="submit" aria-label="Send">
							{/* Paper-plane icon */}
							<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" style={{ color: 'var(--vscode-button-foreground, #fff)' }}>
								<path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/>
							</svg>
						</button>
					</div>
				</form>
				<div className="color-fg-muted">Using <b>Larry Google Coding Agent</b></div>
  </div>)
}