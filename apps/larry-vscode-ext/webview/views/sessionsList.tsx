/** @jsx h */
import { useEffect, useState } from 'preact/hooks';
import { h } from 'preact';
import { formatDate } from '../utils/date';
import { Conversation } from '../../src/types';

export function SessionsList({vscode, onCreateNewSession, onOpenSession, onOpenChat}: {vscode: any, onCreateNewSession: () => void, onOpenSession: (session: Conversation) => void, onOpenChat: (session: Conversation) => void}) {
  const [sessions, setSessions] = useState<Conversation[]>([]);

	// Load sessions from database via VS Code extension
	const loadSessions = async () => {
		try {
			vscode.postMessage({ type: 'loadSessions' });
		} catch (error) {
			console.error('Error loading sessions:', error);
		}
	};
  // Load sessions on mount
  useEffect(() => {
    loadSessions();

    const onMsg = (e: MessageEvent) => {
      const m = (e as any).data;
      if (m?.type === 'sessionsLoaded') {
        setSessions(m.sessions);
        
				if (m.currentWorktreeId && m.sessions.length > 0) {
					console.log('Checking for matching session with worktreeId:', m.currentWorktreeId);
					console.log('Available sessions:', m.sessions.map(s => ({ id: s.conversationId, worktreeId: s.worktreeId })));
					
					const matchingSession = m.sessions.find(session => session.worktreeId === m.currentWorktreeId);
					
					if (matchingSession) {
						console.log('Auto-opening session:', matchingSession.conversationId);
						onOpenSession(matchingSession);
						onOpenChat(matchingSession);
					}
				}
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

	return (
		<div className="p-1 d-flex flex-column gap-2">
					<div className="d-flex flex-justify-between flex-items-center mb-2">
						<h3 className="f4 text-bold mb-0">Sessions</h3>
						<button className="btn btn-primary" onClick={onCreateNewSession}>
							Create new session
						</button>
					</div>
					<div className="sessions-list">
						{sessions.map(session => (
							<div key={session.conversationId} className="Box Box--condensed p-2 mb-2 session-item" onClick={() => onOpenSession(session)}>
								<div className="d-flex flex-justify-between flex-items-start">
									<div className="flex-1">
										<div className="f5 text-bold mb-1">{session.name}</div>
									</div>
									<div className="f6 color-fg-muted ml-2">
										{formatDate(session.updatedAt)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
	);
}