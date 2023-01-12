import { Button, ButtonGroup } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { appRoutes } from './AppRoutes';

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
      <Button as={NavLink} to={appRoutes.projects} end>
        All Projects
      </Button>
    </ButtonGroup>
  );
}
