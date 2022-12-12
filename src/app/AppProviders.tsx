import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ChakraProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ChakraProvider>
  );
}
