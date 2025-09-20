/** @jsx h */
import { h, render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import '@primer/css/dist/primer.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
// Database operations will be handled by the VS Code extension

declare global {
	interface Window { acquireVsCodeApi: () => any; __FOUNDRY_AGENT__: string; }
}
const vscode = window.acquireVsCodeApi();

// Unified message type matching the Larry app
interface Message {
	conversationId: string;
	id: string;
	updatedAt: string;
	type: string; // in future e.g "markdown", "widget", etc.
	content: string;
	metadata: {
		isUserTurn: boolean;
		widgetData?: Record<string, any>;
	};
}

interface Conversation {
	conversationId: string;
	updatedAt: string;
	name: string;
	gitworktreeId: string;
	worktreePath: string;
	messages: Message[];
}

// Legacy message type for backward compatibility
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
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentSessionId, setCurrentSessionId] = useState<string>('');
	const [view, setView] = useState<'sessions' | 'chat' | 'agent-select' | 'create-session' | 'worktree-created'>('sessions');
	const [currentWorktreeId, setCurrentWorktreeId] = useState<string>('');
	const [createdWorktree, setCreatedWorktree] = useState<{sessionName: string; worktreeName: string; branchName?: string; worktreePath: string; agentId: string} | null>(null);
	const [worktreeStatus, setWorktreeStatus] = useState<'checking' | 'exists' | 'missing' | 'creating' | 'mounting' | 'ready'>('checking');
	const [sessions, setSessions] = useState<Conversation[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	// Generate new conversation ID
	const generateConversationId = () => {
		return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	};

	// Start Docker container for Larry server
	const startLarryServer = async (conversationId: string) => {
		try {
			vscode.postMessage({
				type: 'startLarryServer',
				conversationId: conversationId
			});
		} catch (error) {
			console.error('Error starting Larry server:', error);
		}
	};

	// Stop Docker container
	const stopLarryServer = async (conversationId: string) => {
		try {
			vscode.postMessage({
				type: 'stopLarryServer',
				conversationId: conversationId
			});
		} catch (error) {
			console.error('Error stopping Larry server:', error);
		}
	};

	// Load sessions from database via VS Code extension
	const loadSessions = async () => {
		try {
			vscode.postMessage({ type: 'loadSessions' });
		} catch (error) {
			console.error('Error loading sessions:', error);
		}
	};

	// Load messages for a conversation via VS Code extension
	const loadMessages = async (conversationId: string) => {
		try {
			vscode.postMessage({ 
				type: 'loadMessages', 
				conversationId: conversationId 
			});
		} catch (error) {
			console.error('Error loading messages:', error);
			return [];
		}
	};

	// Polling for new messages
	useEffect(() => {
		const pollInterval = setInterval(async () => {
			if (currentSessionId) {
				try {
					await loadMessages(currentSessionId);
				} catch (error) {
					console.error('Polling error:', error);
				}
			}
		}, 2000);

		return () => clearInterval(pollInterval);
	}, [currentSessionId]);

	// Load sessions on mount
	useEffect(() => {
		loadSessions();
	}, []);

	useEffect(() => {
		function onMsg(e: MessageEvent) {
			const m = (e as any).data;
			if (m?.type === 'worktreeChanged') {
				setCurrentWorktreeId(m.worktreeId);
				// Check if we're in a worktree that matches a session
				const matchingSession = sessions.find(s => s.gitworktreeId === m.worktreeId);
				if (matchingSession) {
					setCurrentSessionId(matchingSession.conversationId);
					setAgentId(matchingSession.conversationId); // Use session ID as agent for now
					setMessages(matchingSession.messages);
					setView('chat');
				} else {
					setCurrentSessionId('');
					setView('sessions');
				}
			}
			if (m?.type === 'worktreeCreated') {
				setCreatedWorktree({
					sessionName: m.sessionName,
					worktreeName: m.worktreeName,
					branchName: m.branchName,
					worktreePath: m.worktreePath,
					agentId: m.agentId
				});
				setView('worktree-created');
			}
			if (m?.type === 'worktreeExists') {
				if (m.exists) {
					setWorktreeStatus('mounting');
					// Simulate Docker mounting
					setTimeout(() => {
						setWorktreeStatus('ready');
					}, 2000);
				} else {
					setWorktreeStatus('missing');
				}
			}
			if (m?.type === 'larryResponse') {
				// Remove loading message and add Larry's response
				setMessages(prev => {
					const filtered = prev.filter(msg => msg.content !== 'Thinking...');
					return [...filtered, m.message];
				});
			}
			if (m?.type === 'conversationUpdated') {
				// Update the entire conversation
				setMessages(m.messages);
			}
			if (m?.type === 'larryServerStarted') {
				if (m.success) {
					console.log(`Larry server started for conversation ${m.conversationId}`);
				} else {
					console.error(`Failed to start Larry server: ${m.error}`);
					vscode.window.showErrorMessage(`Failed to start Larry server: ${m.error}`);
				}
			}
			if (m?.type === 'larryServerStopped') {
				if (m.success) {
					console.log(`Larry server stopped for conversation ${m.conversationId}`);
				} else {
					console.error(`Failed to stop Larry server: ${m.error}`);
				}
			}
			if (m?.type === 'sessionsLoaded') {
				setSessions(m.sessions);
			}
			if (m?.type === 'messagesLoaded') {
				setMessages(m.messages);
			}
		}
		window.addEventListener('message', onMsg as any);
		return () => window.removeEventListener('message', onMsg as any);
	}, [sessions]);

	// Request current worktree on mount
	useEffect(() => {
		vscode.postMessage({ type: 'getCurrentWorktree' });
	}, []);

	function createNewSession() {
		setView('create-session');
	}

	function startSession(agentId: string) {
		// This will be implemented later to create DB record and git worktree
		vscode.postMessage({ type: 'createSession', agentId });
		setAgentId(agentId);
		setCurrentSessionId('new-session');
		setView('chat');
		setMessages([]);
	}

	async function createSessionWithName(sessionName: string, agentId: string) {
		// Generate new conversation ID
		const conversationId = generateConversationId();
		
		// Create new session
		const newSession: Conversation = {
			conversationId,
			updatedAt: new Date().toISOString(),
			name: sessionName,
			gitworktreeId: `worktree-${conversationId}`,
			worktreePath: `.larry/worktrees/${conversationId}`,
			messages: []
		};
		
		// Add to sessions list
		setSessions(prev => [...prev, newSession]);
		
		// Start Larry server in Docker
		await startLarryServer(conversationId);
		
		// Create worktree
		vscode.postMessage({ 
			type: 'createSessionWithName', 
			sessionName, 
			agentId,
			conversationId 
		});
	}

	function createWorktree(worktreePath: string) {
		setWorktreeStatus('creating');
		vscode.postMessage({ type: 'createMissingWorktree', worktreePath });
		// Simulate worktree creation and Docker mounting
		setTimeout(() => {
			setWorktreeStatus('mounting');
			setTimeout(() => {
				setWorktreeStatus('ready');
			}, 2000);
		}, 1000);
	}

	function openWorktree(worktreePath: string) {
		vscode.postMessage({ type: 'openWorktree', worktreePath });
		// Don't change view - stay in sessions view
		// Chat will be shown when user opens the worktree in new window
	}

	function createAnotherSession() {
		setCreatedWorktree(null);
		setView('create-session');
	}

	async function openSession(session: Conversation) {
		setCurrentSessionId(session.conversationId);
		setCurrentWorktreeId(session.gitworktreeId);
		setAgentId(session.conversationId);
		
		// Start Larry server in Docker
		await startLarryServer(session.conversationId);
		
		// Load messages from database
		await loadMessages(session.conversationId);
		
		// Show worktree screen and check if worktree exists
		setCreatedWorktree({
			sessionName: session.name,
			worktreeName: session.gitworktreeId,
			worktreePath: session.worktreePath,
			agentId: session.conversationId
		});
		setWorktreeStatus('checking');
		setView('worktree-created');
		
		// Check if worktree exists
		vscode.postMessage({ type: 'checkWorktreeExists', worktreePath: session.worktreePath });
	}

	async function leaveWorktree() {
		// Stop Larry server in Docker
		if (currentSessionId) {
			await stopLarryServer(currentSessionId);
		}
		
		vscode.postMessage({ type: 'leaveWorktree' });
		setCurrentWorktreeId('');
		setCurrentSessionId('');
		setAgentId('');
		setMessages([]);
		setView('sessions');
	}

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		
		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		return date.toLocaleDateString();
	}

	async function send(e: Event) {
		e.preventDefault();
		const val = (inputRef.current as any)?.value?.trim?.() || '';
		if (!val) return;

		// Add loading message for Larry
		const loadingMessage: Message = {
			conversationId: currentSessionId,
			id: `loading-${Date.now()}`,
			updatedAt: new Date().toISOString(),
			type: 'text',
			content: 'Thinking...',
			metadata: { isUserTurn: false }
		};

		setMessages(prev => [...prev, loadingMessage]);
		if (inputRef.current) (inputRef.current as any).value = '';

		// Send message to VS Code extension for processing and database storage
		vscode.postMessage({ 
			type: 'sendMessage', 
			conversationId: currentSessionId,
			content: val 
		});
	}

	const AppShell = ({ children }: any) => <div class="app">{children}</div>;

	// Sessions view
	if (view === 'sessions') {
		return (
			<AppShell>
				<div class="p-1 d-flex flex-column gap-2">
					<div class="d-flex flex-justify-between flex-items-center mb-2">
						<h3 class="f4 text-bold mb-0">Sessions</h3>
						<button class="btn btn-primary" onClick={createNewSession}>
							Create new session
						</button>
					</div>
					<div class="sessions-list">
						{sessions.map(session => (
							<div key={session.conversationId} class="Box Box--condensed p-2 mb-2 session-item" onClick={() => openSession(session)}>
								<div class="d-flex flex-justify-between flex-items-start">
									<div class="flex-1">
										<div class="f5 text-bold mb-1">{session.name}</div>
										<div class="f6 color-fg-muted">ID: {session.conversationId}</div>
									</div>
									<div class="f6 color-fg-muted ml-2">
										{formatDate(session.updatedAt)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</AppShell>
		);
	}

	// Worktree created view
	if (view === 'worktree-created' && createdWorktree) {
		const isNewSession = currentSessionId === 'new-session';
		
		const getStatusMessage = () => {
			switch (worktreeStatus) {
				case 'checking': return 'Checking worktree...';
				case 'exists': return 'Worktree found, mounting Docker container...';
				case 'missing': return 'Worktree not found';
				case 'creating': return 'Creating worktree...';
				case 'mounting': return 'Mounting Docker container...';
				case 'ready': return 'Ready to open worktree';
				default: return 'Unknown status';
			}
		};

		const getStatusIcon = () => {
			switch (worktreeStatus) {
				case 'checking': return '⏳';
				case 'exists': return '🐳';
				case 'missing': return '❌';
				case 'creating': return '🔨';
				case 'mounting': return '🐳';
				case 'ready': return '✅';
				default: return '❓';
			}
		};

		const isButtonDisabled = worktreeStatus !== 'ready' && worktreeStatus !== 'missing';
		
		return (
			<AppShell>
				<div class="p-1 d-flex flex-column gap-2">
					<div class="d-flex flex-justify-between flex-items-center mb-2">
						<h3 class="f4 text-bold mb-0">
							{isNewSession ? 'Worktree Created' : 'Open Session Worktree'}
						</h3>
						<button class="btn" onClick={() => setView('sessions')}>Back to Sessions</button>
					</div>
					
					<div class="Box p-3">
						<div class="f5 text-bold mb-2">Session: {createdWorktree.sessionName}</div>
						<div class="f6 color-fg-muted mb-2">Worktree: {createdWorktree.worktreeName}</div>
						{createdWorktree.branchName && (
							<div class="f6 color-fg-muted mb-2">Branch: {createdWorktree.branchName}</div>
						)}
						<div class="f6 color-fg-muted mb-3">Path: {createdWorktree.worktreePath}</div>
						
						<div class="Box p-2 mb-3" style={{ background: 'var(--vscode-editor-background)' }}>
							<div class="d-flex flex-items-center gap-2">
								<span class="f4">{getStatusIcon()}</span>
								<span class="f6">{getStatusMessage()}</span>
							</div>
						</div>
						
						<div class="d-flex flex-column gap-2">
							<div class="d-flex gap-2">
								{worktreeStatus === 'missing' ? (
									<button 
										class="btn btn-primary" 
										onClick={() => createWorktree(createdWorktree.worktreePath)}
									>
										Create Worktree
									</button>
								) : (
									<button 
										class="btn btn-primary" 
										onClick={() => openWorktree(createdWorktree.worktreePath)}
										disabled={isButtonDisabled}
									>
										Open Worktree
									</button>
								)}
								{isNewSession && worktreeStatus === 'ready' && (
									<button 
										class="btn" 
										onClick={createAnotherSession}
									>
										Create Another Session
									</button>
								)}
							</div>
							<div class="f6 color-fg-muted">
								💡 Use native git commands to push/pull changes
							</div>
						</div>
					</div>
				</div>
			</AppShell>
		);
	}

	// Create session view
	if (view === 'create-session') {
		return <CreateSessionView onBack={() => setView('sessions')} onCreateSession={createSessionWithName} />;
	}

	// Agent selection view
	if (view === 'agent-select') {
		return (
			<AppShell>
				<div class="p-1 d-flex flex-column gap-2">
					<div class="d-flex flex-justify-between flex-items-center mb-2">
						<h3 class="f4 text-bold mb-0">Select Agent</h3>
						<button class="btn" onClick={() => setView('sessions')}>Back to Sessions</button>
					</div>
					<div class="d-flex flex-column gap-2">
						<button class="btn btn-primary" onClick={() => startSession('auto')}>Auto (let's figure it out from your first request)</button>
						<button class="btn btn-primary" onClick={() => startSession('google')}>Google Coding Agent</button>
						<button class="btn" disabled title="Coming soon" onClick={() => startSession('slack')}>Slack Coding Agent (disabled)</button>
						<button class="btn" disabled title="Coming soon" onClick={() => startSession('microsoft')}>Microsoft Coding Agent (disabled)</button>
					</div>
				</div>
			</AppShell>
		);
	}

	// Chat view
	if (view === 'chat') {
		return (
			<AppShell>
				<div class="p-1 d-flex flex-justify-between flex-items-center mb-2">
					<div class="f4 text-bold">
						{currentWorktreeId ? `Worktree: ${currentWorktreeId}` : `Agent: ${agentId}`}
					</div>
					<div class="d-flex gap-2">
						{!currentWorktreeId && (
							<button class="btn" onClick={() => setView('sessions')}>Sessions</button>
						)}
						{currentWorktreeId ? (
							<button class="btn" onClick={leaveWorktree}>Leave worktree</button>
						) : (
							<button class="btn" onClick={() => { setAgentId(''); setMessages([]); setView('sessions'); }}>Change Agent</button>
						)}
					</div>
				</div>
				<div id="log" class="p-1 d-flex flex-column gap-2 mb-2 messages">
					{messages.map((m, i) => (
						<MessageComponent key={m.id} message={m} />
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

	// Fallback (should not reach here)
	return <AppShell><div>Loading...</div></AppShell>;
}

function MessageComponent({ message }: { message: Message }) {
	const html = useMarkdown(message.content);
	const ref = useRef<HTMLDivElement>(null);
	const isUser = message.metadata.isUserTurn === false && message.content !== 'Thinking...';
	const isLarry = !isUser;
	const isLoading = message.content === 'Thinking...';

	useEffect(() => {
		if (!ref.current || isLoading) return;
		ref.current.querySelectorAll('pre code').forEach((el: any) => hljs.highlightElement(el));
	}, [html, isLoading]);

	if (isUser) return (
		<div class="Box p-2">
			<div class="color-fg-muted mb-1"><b>You:</b></div>
			<div>{message.content}</div>
		</div>
	);
	
	return (
		<div class="Box p-2" ref={ref as any}>
			<div class="color-fg-muted mb-1">
				<b>Larry:</b>
				{message.metadata.isUserTurn && <span class="ml-2 color-fg-accent">(waiting for your response)</span>}
			</div>
			<div class="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}

// Legacy Message component for backward compatibility
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

function CreateSessionView({ onBack, onCreateSession }: { onBack: () => void; onCreateSession: (sessionName: string, agentId: string) => void }) {
	const [sessionName, setSessionName] = useState<string>('');
	const [selectedAgent, setSelectedAgent] = useState<string>('');
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const agents = [
		{ id: 'auto', label: 'Auto (let\'s figure it out from your first request)', enabled: true },
		{ id: 'google', label: 'Google Coding Agent', enabled: true },
		{ id: 'slack', label: 'Slack Coding Agent (disabled)', enabled: false },
		{ id: 'microsoft', label: 'Microsoft Coding Agent (disabled)', enabled: false }
	];

	function handleCreate(e: Event) {
		e.preventDefault();
		if (!sessionName.trim() || !selectedAgent) return;
		
		setIsCreating(true);
		onCreateSession(sessionName.trim(), selectedAgent);
	}

	return (
		<div class="app">
			<div class="p-1 d-flex flex-column gap-2">
				<div class="d-flex flex-justify-between flex-items-center mb-2">
					<h3 class="f4 text-bold mb-0">Create New Session</h3>
					<button class="btn" onClick={onBack}>Back to Sessions</button>
				</div>
				
				<form onSubmit={handleCreate} class="d-flex flex-column gap-3">
					<div class="form-group">
						<label class="form-label f5 text-bold mb-1">Session Name</label>
						<input 
							class="form-control" 
							placeholder="Enter session name (e.g., 'React Component Refactoring')"
							value={sessionName}
							onInput={(e: any) => setSessionName(e.target.value)}
							disabled={isCreating}
						/>
					</div>
					
					<div class="form-group">
						<label class="form-label f5 text-bold mb-1">Select Agent</label>
						<div class="d-flex flex-column gap-2">
							{agents.map(agent => (
								<label key={agent.id} class="d-flex flex-items-center">
									<input 
										type="radio" 
										name="agent" 
										value={agent.id}
										checked={selectedAgent === agent.id}
										onChange={(e: any) => setSelectedAgent(e.target.value)}
										disabled={!agent.enabled || isCreating}
										class="mr-2"
									/>
									<span class={!agent.enabled ? 'color-fg-muted' : ''}>{agent.label}</span>
								</label>
							))}
						</div>
					</div>
					
					<div class="d-flex gap-2">
						<button 
							type="submit" 
							class="btn btn-primary" 
							disabled={!sessionName.trim() || !selectedAgent || isCreating}
						>
							{isCreating ? 'Creating...' : 'Create Session & Worktree'}
						</button>
						<button type="button" class="btn" onClick={onBack} disabled={isCreating}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

render(<App />, document.getElementById('root')!);