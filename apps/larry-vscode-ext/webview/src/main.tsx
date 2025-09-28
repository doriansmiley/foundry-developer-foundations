import { render } from 'preact';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from './views/AppRoot';
import { BootChannel } from './views/BootChannel';

// Create a single QueryClient for the webview lifetime
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
    mutations: {
      retry: 0,
    },
  },
});

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
