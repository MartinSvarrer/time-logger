import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <Flex
      height="100vh"
      width="100vw"
      overflow="hidden"
      direction="column"
      backgroundColor="gray.50"
    >
      {children}
    </Flex>
  );
}

export function AppLayoutHeader({ children }: PropsWithChildren) {
  return (
    <Flex as="header" backgroundColor="white">
      {children}
    </Flex>
  );
}

export function AppLayoutMain({ children }: PropsWithChildren) {
  return (
    <Flex as="main" overflow="auto" flex={1}>
      {children}
    </Flex>
  );
}

export default AppLayout;
