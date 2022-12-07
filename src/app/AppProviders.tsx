import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function AppProviders({ children }: PropsWithChildren) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
