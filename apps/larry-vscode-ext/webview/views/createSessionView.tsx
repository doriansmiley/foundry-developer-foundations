/** @jsx h */
import { useState } from 'preact/hooks';
import { h } from 'preact';

export function CreateSessionView({ onBack, onCreateSession }: { onBack: () => void; onCreateSession: (sessionName: string) => void }) {
	const [originalTask, setOriginalTask] = useState<string>('');
	const [isCreating, setIsCreating] = useState<boolean>(false);

	function handleCreate(e: any) {
		e.preventDefault();
		setIsCreating(true);
		onCreateSession(originalTask);
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
						<label className="form-label f5 text-bold mb-1">What can I help you with?</label>
						<textarea 
							className="form-control" 
							placeholder="What do you want to do?"
							value={originalTask}
							onInput={(e: any) => setOriginalTask(e.target.value)}
							disabled={isCreating}
						/>
					</div>
					
					<div className="d-flex">
						<button 
							type="submit" 
							className="btn btn-primary mr-2" 
							disabled={!originalTask.trim() || isCreating}
						>
							{isCreating ? 'Creating...' : 'Create'}
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