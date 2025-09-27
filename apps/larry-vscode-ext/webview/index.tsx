/** @jsx h */
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import '@primer/css/dist/primer.css';
import { SessionsList } from './views/sessionsList';
import { CreateSessionView } from './views/createSessionView';
import { Chat } from './views/chat';
import { Session } from '../src/types';

declare global {
	interface Window { acquireVsCodeApi: () => any; __FOUNDRY_AGENT__: string; }
}
const vscode = window.acquireVsCodeApi();

function App() {
	const [currentConversationId, setCurrentConversationId] = useState<string>('');
	const [view, setView] = useState<'sessions' | 'chat' | 'agent-select' | 'create-session' | 'worktree-created'>('sessions');
	const [currentWorktreeId, setCurrentWorktreeId] = useState<string>('');
	const [worktreeStatus, setWorktreeStatus] = useState<'checking' | 'exists' | 'missing' | 'creating' | 'mounting' | 'ready'>('checking');
	const [currentSession, setCurrentSession] = useState<Session | null>(null);


	// Start Docker container for Larry server
	const startLarryServer = async (sessionId: string, worktreeId: string) => {
		try {
			vscode.postMessage({
				type: 'startLarryServer',
				sessionId: sessionId,
				worktreeId: worktreeId
			});
		} catch (error) {
			console.error('Error starting Larry server:', error);
		}
	};


	useEffect(() => {
		async function onMsg(e: MessageEvent) {
			const m = (e as any).data;
			if (m?.type === 'worktreeCreated') {
				setCurrentSession({
					name: m.sessionName,
					worktreeId: m.worktreeId,
					id: m.sessionId,
					originalTask: m.originalTask,
					updatedAt: m.updatedAt
				});
				setView('worktree-created');
				setWorktreeStatus('mounting');
				await startLarryServer(m.sessionId, m.worktreeId);
				setWorktreeStatus('ready');	
			}
			if (m?.type === 'worktreeExists') {
				if (m.exists) {
					setWorktreeStatus('mounting');
					await startLarryServer(m.sessionId, m.worktreeId);
					setWorktreeStatus('ready');
				} else {
					setWorktreeStatus('missing');
				}
			}

			if (m?.type === 'larryServerStarted') {
				if (m.success) {
					console.log(`Larry server started for session ${m.sessionId}`);
					setWorktreeStatus('ready');
				} else {
					console.error(`Failed to start Larry server: ${m.error}`);
					vscode.window.showErrorMessage(`Failed to start Larry server: ${m.error}`);
				}
			}
			if (m?.type === 'larryServerStopped') {
				if (m.success) {
					console.log(`Larry server stopped for session ${m.sessionId}`);
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

	async function createSession(originalTask: string) {
		vscode.postMessage({ 
			type: 'createSession', 
			sessionName: originalTask.length > 20 ? originalTask.substring(0, 20) + '...' : originalTask,
			originalTask 
		});
	}

	async function createWorktree(worktreeId: string) {
		setWorktreeStatus('creating');
		vscode.postMessage({ type: 'createMissingWorktree', worktreeId });

		await startLarryServer(currentSession?.id || '', worktreeId);
	}

	function openWorktree(worktreeId: string) {
		vscode.postMessage({ type: 'openWorktree', worktreeId });
	}

	function createAnotherSession() {
		setCurrentSession(null);
		setCurrentConversationId('');
		setCurrentWorktreeId('');
		setView('create-session');
	}

	async function openChat(session: Session) {
		// TODO work on this to use threadsDao data
		setCurrentSession(session);
		setCurrentConversationId(session.threadsId || '');
		setCurrentWorktreeId(session.worktreeId);
		setView('chat');
	}

	async function openSession(session: Session) {
		setCurrentSession(session);
		setCurrentConversationId(session.threadsId || '');
		setCurrentWorktreeId(session.worktreeId);
		
		setWorktreeStatus('checking');
		setView('worktree-created');
		
		// Check if worktree exists
		vscode.postMessage({ type: 'checkWorktreeExists', worktreeId: session.worktreeId, sessionId: session.id });
	}

	console.log('currentSession', currentSession);
	const AppShell = ({ children }: any) => <div class="app">{children}</div>;

	return (
		<AppShell>
			<Chat 
				originalTask={currentSession?.originalTask || ''}
				vscode={vscode}
				currentWorktreeId={'10001-test'}
				goBackToSessions={() => setView('sessions')}
				sessionId={'43a37ccc-26cf-4e4e-8b88-006c990ccc22'}
				onLeaveWorktree={() => 
				{ setView('sessions'); setCurrentSession(null) 
					setCurrentWorktreeId('')
				} } />
		</AppShell>
	);
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
		const worktreeData = {
			sessionName: currentSession?.name,
			worktreeName: currentSession?.worktreeId,
			branchName: currentSession?.worktreeId,
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
							Open Session Worktree
						</h3>
						<button class="btn" onClick={() => {setCurrentSession(null); setWorktreeStatus('checking'); setView('sessions')}}>Back to Sessions</button>
					</div>
					
					<div class="Box p-3">
						<div class="f5 text-bold mb-2">Session: {worktreeData?.sessionName}</div>
						<div class="f6 color-fg-muted mb-2">Worktree: {worktreeData?.worktreeName}</div>
						
						<div class="Box p-2 mb-3" style={{ background: 'var(--vscode-editor-background)' }}>
							<div class="d-flex d-flex flex-items-center">
								<div class="f4 pr-1">{getStatusIcon()}</div>
								<div class="f6">{getStatusMessage()}</div>
							</div>
						</div>
						
						<div class="d-flex flex-column gap-2">
							<div>
								{worktreeStatus === 'missing' ? (
									<div className="width-full mb-1">
										<button 
										class="btn btn-primary width-full" 
										onClick={() => createWorktree(worktreeData.worktreeName || '')}
									>
										Create Worktree
									</button>
									</div>
								) : (
									<div className="width-full mb-1">
										<button 
										class="btn btn-primary width-full" 
										onClick={() => openWorktree(worktreeData.worktreeName || '')}
										disabled={isButtonDisabled}
									>
										Open Worktree
									</button>
										</div>
								)}
								{worktreeStatus === 'ready' && (
									<div className="width-full mb-1">
										<button 
										class="btn width-full" 
										onClick={createAnotherSession}
									>
										Create Another Session
									</button>
										</div>
								)}
							</div>
							<div class="f6 color-fg-muted">
								💡 Within worktree use native git commands to commit, push/pull changes. <br />All <b>AI</b> changes will happen in container and will be automatically synced back to your local worktree.
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
					conversationId={currentConversationId}
					sessionId={currentSession?.id || ''}
					onLeaveWorktree={() => 
					{ setView('sessions'); setCurrentConversationId(''); setCurrentSession(null)
						setCurrentWorktreeId('')
					} } />
			</AppShell>
		);
	}

	// Fallback (should not reach here)
	return <AppShell><div>Loading...</div></AppShell>;
}

render(<App />, document.getElementById('root')!);