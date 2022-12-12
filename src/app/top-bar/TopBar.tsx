import { HStack, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../AppRoutes';

export default function TopBar() {
  return (
    <HStack as="nav" p={2} shadow="base" flex={1}>
      <Link as={NavLink} to={APP_ROUTES.projects} end>
        Projects
      </Link>
    </HStack>
  );
}
