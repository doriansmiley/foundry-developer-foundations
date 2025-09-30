/* jsx preact */
/* @jsxImportSource preact */
import { render } from 'preact';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from './views/AppRoot';
import { BootChannel } from './views/BootChannel';
import { queryClient } from './lib/query';

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BootChannel />
        <AppRoot />
      </div>
    </QueryClientProvider>
  );
}

render(<Root />, document.getElementById('root')!);
