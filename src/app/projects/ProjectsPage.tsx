import {
  Badge,
  Button,
  ButtonGroup,
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
import { useMemo } from 'react';
import { useProjects } from './projects';

export default function ProjectsPage() {
  const { data } = useProjects();
  const projects = useMemo(() => data?.projects ?? [], [data]);

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
            {projects.map((project) => (
              <Tr key={project.id}>
                <Td>{project.name}</Td>
                <Td>
                  {new Date(project.deadline).toLocaleDateString('en-US')}
                </Td>
                <Td>
                  {project.status === 'open' ? (
                    <Badge colorScheme="green">Open</Badge>
                  ) : (
                    <Badge colorScheme="red">Close</Badge>
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
                      <MenuItem>View details</MenuItem>
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
