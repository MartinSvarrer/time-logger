import {
  Button,
  ButtonGroup,
  Heading,
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
import { useParams } from 'react-router-dom';
import { useProjectDetails } from './projects';

/* eslint-disable-next-line */
export interface ProjectDetailsProps {}

export function ProjectDetailsPage(props: ProjectDetailsProps) {
  const params = useParams();
  const { data } = useProjectDetails(params.id);

  if (!data) {
    return null;
  }

  return (
    <VStack padding={2} gap={2} width="100%">
      <Heading>{data.project.name}</Heading>
      <ButtonGroup>
        <Button variant="solid" colorScheme="blue">
          Register time
        </Button>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => alert('To be implemented')}
        >
          Create Invoice
        </Button>
      </ButtonGroup>
      <TableContainer flex={1} width="100%" overflowY="auto">
        <Table variant="simple" width="100%">
          <TableCaption>Time registrations</TableCaption>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th isNumeric>Time (hours)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.registrations.map((registration) => (
              <Tr key={registration.id}>
                <Td
                  maxWidth={[200, 350, 600, 800]}
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {registration.description}
                </Td>
                <Td isNumeric>
                  {minutesToHours(registration.time.value).toLocaleString(
                    'en-US',
                    { maximumFractionDigits: 1 }
                  )}
                  h
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default ProjectDetailsPage;
