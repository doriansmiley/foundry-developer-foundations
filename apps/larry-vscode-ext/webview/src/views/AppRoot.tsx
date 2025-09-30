import { useState } from 'preact/hooks';
import { isInWorktree } from '../signals/store';
import { MainRepoScreen } from './MainRepoScreen';
import { WorktreeScreen } from './WorktreeScreen';
import { Loader } from './components/Loader';

export function AppRoot() {
  // Simple useState for loading - starts as true
  const [isLoading, setIsLoading] = useState(true);
  
  // Expose a simple function for BootChannel to call
  if (typeof window !== 'undefined') {
    (window as any).setAppLoading = setIsLoading;
  }
  
  if (isLoading) {
    return (
      <div className="p-3">
        <Loader message="Initializing Larry" />
      </div>
    );
  }

  return (
    <div className="p-3">
      {isInWorktree.value ? <WorktreeScreen /> : <MainRepoScreen />}
    </div>
  );
}
