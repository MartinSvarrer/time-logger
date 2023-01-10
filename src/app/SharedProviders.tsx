import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useInstance } from '../lib/hooks/useInstance';

/**
 * Shared providers are shared between app entries, like browser client and tests.
 */
export default function SharedProviders({ children }: PropsWithChildren) {
  const client = useInstance(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
