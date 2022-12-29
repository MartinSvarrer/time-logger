import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { minutesToHours } from '@time-logger/lib/time/Time';
import { APP_ROUTES } from 'app/AppRoutes';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProjects } from './projects';

export default function ProjectsPage() {
  const { data } = useProjects();
  const projects = useMemo(() => data?.projects ?? [], [data]);
  const [sorting, setSorting] = useState<'none' | 'asc' | 'desc'>('none');

  function toggleSort() {
    if (sorting === 'none') {
      setSorting('asc');
      return;
    }

    setSorting('none');
  }

  const sortedProjects = useMemo(() => {
    if (sorting === 'none') {
      return projects;
    }

    return projects
      .slice()
      .sort((a, b) => (new Date(a.deadline) > new Date(b.deadline) ? 1 : -1));
  }, [projects, sorting]);

  return (
    <VStack padding={2} gap={2} width="100%">
      <TableContainer flex={1} width="100%">
        <Table variant="simple" width="100%">
          <TableCaption>List of projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Project name</Th>
              <Th>
                <Button
                  variant="link"
                  textTransform="inherit"
                  color="inherit"
                  fontSize="inherit"
                  fontWeight="inherit"
                  isActive={sorting !== 'none'}
                  _active={{ color: 'teal', textDecoration: 'underline' }}
                  onClick={toggleSort}
                >
                  Deadline
                </Button>
              </Th>
              <Th>Project status</Th>
              <Th isNumeric>Time spent</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedProjects.map((project) => (
              <Tr key={project.id}>
                <Td>
                  <Button
                    variant="link"
                    as={NavLink}
                    to={APP_ROUTES.projectOverview(
                      encodeURIComponent(project.id)
                    )}
                  >
                    {project.name}
                  </Button>
                </Td>
                <Td>
                  {new Date(project.deadline).toLocaleDateString('en-US')}
                </Td>
                <Td>
                  {project.status === 'open' ? (
                    <Badge colorScheme="green">Open</Badge>
                  ) : (
                    <Badge colorScheme="red">Closed</Badge>
                  )}
                </Td>
                <Td isNumeric>
                  {minutesToHours(project.timeSpent.value).toLocaleString(
                    'en-US',
                    { maximumFractionDigits: 1 }
                  )}
                  h
                </Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={Button}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Register time</MenuItem>
                      <MenuItem>View project</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
