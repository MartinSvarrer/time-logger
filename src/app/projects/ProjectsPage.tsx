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

const dateFormat = Intl.DateTimeFormat('en-US');
const durationFormat = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

export default function ProjectsPage() {
  const { data } = useProjects();

  const projects = useMemo(() => {
    return (data?.projects ?? []).map((project) => ({
      ...project,
      deadline: new Date(project.deadline),
    }));
  }, [data]);

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
                <Td>{dateFormat.format(project.deadline)}</Td>
                <Td>
                  {project.status === 'open' ? (
                    <Badge colorScheme="green">Open</Badge>
                  ) : (
                    <Badge colorScheme="red">Close</Badge>
                  )}
                </Td>
                <Td isNumeric>
                  {durationFormat.format(
                    minutesToHours(project.timeSpent.value)
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
