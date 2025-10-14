/* JSX */
/* @jsxImportSource preact */
import { useExtensionStore } from '../store/store';
import { MainRepoScreen } from './MainRepoScreen';
import { WorktreeScreen } from './WorktreeScreen';
import { Loader } from './components/Loader';

export function AppRoot() {
  const { isInWorktree, isLoadingApp } = useExtensionStore();
  
  if (isLoadingApp) {
    return (
      <div className="p-3">
        <Loader message="Initializing Larry" />
      </div>
    );
  }

  return (
    <div className="p-3">
      <MainRepoScreen />
      {/* {isInWorktree ? <WorktreeScreen /> : <MainRepoScreen />} */}
    </div>
  );
}
