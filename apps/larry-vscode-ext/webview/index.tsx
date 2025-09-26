/** @jsx h */
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import '@primer/css/dist/primer.css';
import { SessionsList } from './views/sessionsList';
import { CreateSessionView } from './views/createSessionView';
import { Chat } from './views/chat';
import { Conversation } from '../src/types';

declare global {
	interface Window { acquireVsCodeApi: () => any; __FOUNDRY_AGENT__: string; }
}
const vscode = window.acquireVsCodeApi();


function App() {
	const [currentSessionId, setCurrentSessionId] = useState<string>('');
	const [view, setView] = useState<'sessions' | 'chat' | 'agent-select' | 'create-session' | 'worktree-created'>('sessions');
	const [currentWorktreeId, setCurrentWorktreeId] = useState<string>('');
	const [createdWorktree, setCreatedWorktree] = useState<{sessionName: string; worktreeName: string; branchName?: string; worktreeId: string} | null>(null);
	const [worktreeStatus, setWorktreeStatus] = useState<'checking' | 'exists' | 'missing' | 'creating' | 'mounting' | 'ready'>('checking');
	const [currentSession, setCurrentSession] = useState<Conversation | null>(null);
	const [currentWorktreeIdFromExtension, setCurrentWorktreeIdFromExtension] = useState<string>('');

	// Generate new conversation ID
	const generateConversationId = () => {
		return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	};


	// Start Docker container for Larry server
	const startLarryServer = async (conversationId: string, worktreeId: string) => {
		try {
			vscode.postMessage({
				type: 'startLarryServer',
				conversationId: conversationId,
				worktreeId: worktreeId
			});
		} catch (error) {
			console.error('Error starting Larry server:', error);
		}
	};


	useEffect(() => {
		async function onMsg(e: MessageEvent) {
			const m = (e as any).data;
			if (m?.type === 'worktreeChanged') {
				console.log('Worktree changed to:', m.worktreeId);
				setCurrentWorktreeIdFromExtension(m.worktreeId);
				// The useEffect will handle the session matching
			}
			if (m?.type === 'worktreeCreated') {
				setCurrentWorktreeIdFromExtension(m.worktreeId);
				setCreatedWorktree({
					sessionName: m.sessionName,
					worktreeName: m.worktreeName,
					branchName: m.branchName,
					worktreeId: m.worktreeId
				});
				setView('worktree-created');
				setWorktreeStatus('mounting');
				await startLarryServer(m.conversationId, m.worktreeId);
				setWorktreeStatus('ready');	
			}
			if (m?.type === 'worktreeExists') {
				if (m.exists) {
					setWorktreeStatus('mounting');
					await startLarryServer(m.conversationId, m.worktreeId);
					setWorktreeStatus('ready');
				} else {
					setWorktreeStatus('missing');
				}
			}

			if (m?.type === 'larryServerStarted') {
				if (m.success) {
					console.log(`Larry server started for conversation ${m.conversationId}`);
					setWorktreeStatus('ready');
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
		}
		window.addEventListener('message', onMsg as any);
		return () => window.removeEventListener('message', onMsg as any);
	}, []);

	function onCreateNewSessionClick() {
		setView('create-session');
	}

	async function createSession(sessionName: string, agentId: string) {
		// Generate new conversation ID
		const conversationId = generateConversationId();
		
		// Create worktree
		vscode.postMessage({ 
			type: 'createSession', 
			sessionName, 
			conversationId,
			agentId,
		});
	}

	async function createWorktree(worktreeId: string) {
		setWorktreeStatus('creating');
		vscode.postMessage({ type: 'createMissingWorktree', worktreeId });

		await startLarryServer(currentSessionId, worktreeId);
	}

	function openWorktree(worktreeId: string) {
		vscode.postMessage({ type: 'openWorktree', worktreeId });
	}

	function createAnotherSession() {
		setCreatedWorktree(null);
		setCurrentSessionId('');
		setCurrentWorktreeId('');
		setView('create-session');
	}

	async function openChat(session: Conversation) {
		setCurrentSession(session);
		setCurrentSessionId(session.conversationId);
		setCurrentWorktreeId(session.worktreeId);
		setView('chat');
	}

	async function openSession(session: Conversation) {
		setCurrentSession(session);
		setCurrentSessionId(session.conversationId);
		setCurrentWorktreeId(session.worktreeId);
		
		setWorktreeStatus('checking');
		setView('worktree-created');
		
		// Check if worktree exists
		vscode.postMessage({ type: 'checkWorktreeExists', worktreeId: session.worktreeId, conversationId: session.conversationId });
	}

	const AppShell = ({ children }: any) => <div class="app">{children}</div>;

	// return (
	// 	<AppShell>
	// 		<Chat 
	// 			vscode={vscode}
	// 			currentWorktreeId={currentWorktreeId}
	// 			goBackToSessions={() => setView('sessions')}
	// 			currentSessionId={currentSessionId}
	// 			onLeaveWorktree={() => 
	// 			{ setView('sessions'); setCurrentSessionId('') 
	// 				setCurrentWorktreeId('')
	// 			} } />
	// 	</AppShell>
	// );
	// Sessions view
	if (view === 'sessions') {
		return (
			<AppShell>
				<SessionsList vscode={vscode} onCreateNewSession={onCreateNewSessionClick} onOpenSession={openSession} onOpenChat={openChat} />
			</AppShell>
		);
	}

	// Worktree created view
	if (view === 'worktree-created') {
		const isNewSession = currentSessionId === 'new-session';
		const worktreeData = {
			sessionName: currentSession?.name || createdWorktree?.sessionName,
			worktreeName: currentSession?.worktreeId || createdWorktree?.worktreeName,
			branchName: currentSession?.worktreeId || createdWorktree?.branchName,
		}
		
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
						<button class="btn" onClick={() => {setCurrentSession(null); setWorktreeStatus('checking'); setView('sessions')}}>Back to Sessions</button>
					</div>
					
					<div class="Box p-3">
						<div class="f5 text-bold mb-2">Session: {worktreeData?.sessionName}</div>
						<div class="f6 color-fg-muted mb-2">Worktree: {worktreeData?.worktreeName}</div>
						
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
										onClick={() => createWorktree(worktreeData.worktreeName || '')}
									>
										Create Worktree
									</button>
								) : (
									<button 
										class="btn btn-primary" 
										onClick={() => openWorktree(worktreeData.worktreeName || '')}
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
		return <CreateSessionView onBack={() => setView('sessions')} onCreateSession={createSession} />;
	}

	// Chat view
	if (view === 'chat') {
		return (
			<AppShell>
				<Chat 
					vscode={vscode}
					currentWorktreeId={currentWorktreeId}
					goBackToSessions={() => setView('sessions')}
					currentSessionId={currentSessionId}
					onLeaveWorktree={() => 
					{ setView('sessions'); setCurrentSessionId('') 
						setCurrentWorktreeId('')
					} } />
			</AppShell>
		);
	}

	// Fallback (should not reach here)
	return <AppShell><div>Loading...</div></AppShell>;
}

render(<App />, document.getElementById('root')!);