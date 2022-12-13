import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
