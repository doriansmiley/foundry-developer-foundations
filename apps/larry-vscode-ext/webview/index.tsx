/** @jsx h */
import { h, render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import '@primer/css/dist/primer.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

declare global {
	interface Window { acquireVsCodeApi: () => any; __FOUNDRY_AGENT__: string; }
}
const vscode = window.acquireVsCodeApi();

type Msg = { who: 'You' | 'Larry'; text: string; isLoading?: boolean };

function useMarkdown(md: string) {
	return useMemo(() => {
		marked.setOptions({ gfm: true, breaks: true });
		const html = marked.parse(md) as string;
		return DOMPurify.sanitize(html);
	}, [md]);
}

function App() {
	const [agentId, setAgentId] = useState<string>(window.__FOUNDRY_AGENT__ || '');
	const [messages, setMessages] = useState<Msg[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function onMsg(e: MessageEvent) {
			const m = (e as any).data;
			if (m?.type === 'assistantMessage') {
				setMessages(prev => prev.map((x, i) => i === prev.length - 1 && x.isLoading ? { who: 'Larry', text: m.text } : x));
			}
			if (m?.type === 'agentChanged') { setAgentId(m.agentId); setMessages([]); }
		}
		window.addEventListener('message', onMsg as any);
		return () => window.removeEventListener('message', onMsg as any);
	}, []);

	function selectAgent(id: string, enabled: boolean) {
		if (!enabled) return;
		setAgentId(id);
		vscode.postMessage({ type: 'selectAgent', agentId: id });
	}

	async function send(e: Event) {
		e.preventDefault();
		const val = (inputRef.current as any)?.value?.trim?.() || '';
		if (!val) return;
		setMessages(prev => [...prev, { who: 'You', text: val }, { who: 'Larry', text: '<span class="AnimatedEllipsis"></span>', isLoading: true }]);
		if (inputRef.current) (inputRef.current as any).value = '';
		// Simulate async: wait 3s, then request reply
		setTimeout(() => {
			vscode.postMessage({ type: 'userMessage', text: val, agentId });
		}, 3000);
	}

	const AppShell = ({ children }: any) => <div class="app">{children}</div>;

	if (!agentId) {
		return (
			<AppShell>
				<div class="p-1 d-flex flex-column gap-2 messages">
					<button class="btn btn-primary" onClick={() => selectAgent('auto', true)}>Auto (let’s figure it out from your first request)</button>
					<button class="btn btn-primary" onClick={() => selectAgent('google', true)}>Google Coding Agent</button>
					<button class="btn" disabled title="Coming soon" onClick={() => selectAgent('slack', false)}>Slack Coding Agent (disabled)</button>
					<button class="btn" disabled title="Coming soon" onClick={() => selectAgent('microsoft', false)}>Microsoft Coding Agent (disabled)</button>
				</div>
			</AppShell>
		);
	}

	return (
		<AppShell>
			<div class="p-1 d-flex flex-justify-between flex-items-center">
				<div class="f4 text-bold">Agent: {agentId}</div>
				<button class="btn" onClick={() => { setAgentId(''); setMessages([]); }}>Change Agent</button>
			</div>
			<div id="log" class="p-1 d-flex flex-column gap-2 mb-2 messages">
				{messages.map((m, i) => (
					<Message key={i} who={m.who} text={m.text} isLoading={m.isLoading} />
				))}
			</div>
			<form onSubmit={send} class="composer p-1">
				<div class="form-group d-flex">
					<input ref={inputRef} class="form-control flex-1 mr-2" placeholder="Type a message..." />
					<button class="btn btn-primary btn-icon" type="submit" aria-label="Send">
						{/* Paper-plane icon */}
						<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" style={{ color: 'var(--vscode-button-foreground, #fff)' }}>
							<path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/>
						</svg>
					</button>
				</div>
			</form>
		</AppShell>
	);
}

function Message({ who, text, isLoading }: Msg) {
	const html = useMarkdown(text);
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!ref.current || isLoading) return;
		ref.current.querySelectorAll('pre code').forEach((el: any) => hljs.highlightElement(el));
	}, [html, isLoading]);

	if (who === 'You') return (
		<div class="Box p-2">
			<div class="color-fg-muted mb-1"><b>{who}:</b></div>
			<div>{text}</div>
		</div>
	);
	return (
		<div class="Box p-2" ref={ref as any}>
			<div class="color-fg-muted mb-1"><b>{who}:</b></div>
			<div class="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}

render(<App />, document.getElementById('root')!); 