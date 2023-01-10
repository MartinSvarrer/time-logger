import { Button, ButtonGroup } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from './AppRoutes';

export default function TopBar() {
  return (
    <ButtonGroup
      as="nav"
      p={2}
      shadow="base"
      flex={1}
      variant="ghost"
      colorScheme="blue"
    >
      <Button as={NavLink} to={APP_ROUTES.projects} end>
        All Projects
      </Button>
    </ButtonGroup>
  );
}
