/** @jsx h */
import { useState } from 'preact/hooks';
import { h } from 'preact';

export function CreateSessionView({ onBack, onCreateSession }: { onBack: () => void; onCreateSession: (sessionName: string, agentId: string) => void }) {
	const [sessionName, setSessionName] = useState<string>('');
	const [selectedAgent, setSelectedAgent] = useState<string>('');
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const agents = [
		{ id: 'auto', label: 'Auto (let\'s figure it out from your first request)', enabled: true },
		{ id: 'google', label: 'Google Coding Agent', enabled: true },
		{ id: 'slack', label: 'Slack Coding Agent (disabled)', enabled: false },
		{ id: 'microsoft', label: 'Microsoft Coding Agent (disabled)', enabled: false }
	];

	function handleCreate(e: any) {
		e.preventDefault();
		if (!sessionName.trim() || !selectedAgent) return;
		
		setIsCreating(true);
		onCreateSession(sessionName.trim(), selectedAgent);
	}

	return (
		<div className="app">
			<div className="p-1 d-flex flex-column gap-2">
				<div className="d-flex flex-justify-between flex-items-center mb-2">
					<h3 className="f4 text-bold mb-0">Create New Session</h3>
					<button className="btn" onClick={onBack}>Back to Sessions</button>
				</div>
				
				<form onSubmit={handleCreate} className="d-flex flex-column gap-3">
					<div className="form-group">
						<label className="form-label f5 text-bold mb-1">Session Name</label>
						<input 
							className="form-control" 
							placeholder="Enter session name (e.g., 'React Component Refactoring')"
							value={sessionName}
							onInput={(e: any) => setSessionName(e.target.value)}
							disabled={isCreating}
						/>
					</div>
					
					<div className="form-group">
						<label className="form-label f5 text-bold mb-1">Select Agent</label>
						<div className="d-flex flex-column gap-2">
							{agents.map(agent => (
								<label key={agent.id} className="d-flex flex-items-center">
									<input 
										type="radio" 
										name="agent" 
										value={agent.id}
										checked={selectedAgent === agent.id}
										onChange={(e: any) => setSelectedAgent(e.target.value)}
										disabled={!agent.enabled || isCreating}
										className="mr-2"
									/>
									<span className={!agent.enabled ? 'color-fg-muted' : ''}>{agent.label}</span>
								</label>
							))}
						</div>
					</div>
					
					<div className="d-flex gap-2">
						<button 
							type="submit" 
							className="btn btn-primary" 
							disabled={!sessionName.trim() || !selectedAgent || isCreating}
						>
							{isCreating ? 'Creating...' : 'Create Session & Worktree'}
						</button>
						<button type="button" className="btn" onClick={onBack} disabled={isCreating}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}