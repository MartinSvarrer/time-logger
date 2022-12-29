import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const TestProviders = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

type RenderParams = Parameters<typeof render>;
const renderWithProviders = (ui: RenderParams[0], options?: RenderParams[1]) =>
  render(ui, { wrapper: TestProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders };
