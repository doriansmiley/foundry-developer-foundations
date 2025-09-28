
import { isInWorktree } from '../signals/store';
import { MainRepoScreen } from './MainRepoScreen';
import { WorktreeScreen } from './WorktreeScreen';

export function AppRoot() {
  return (
    <div className="p-3">
      {isInWorktree.value ? <WorktreeScreen /> : <MainRepoScreen />}
    </div>
  );
}
