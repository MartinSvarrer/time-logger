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
import { useParams } from 'react-router-dom';
import { minutesToHours } from '../../lib/datetime';
import { useProjectDetails } from './projects.service';

export function ProjectDetailsPage() {
  const params = useParams();
  const { data } = useProjectDetails(params.id);

  if (!data) {
    return null;
  }

  return (
    <VStack padding={2} gap={2} width="100%">
      <Heading>{data.project.name}</Heading>
      <ButtonGroup>
        <Button
          variant="solid"
          colorScheme="blue"
          disabled={data.project.status === 'closed'}
        >
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
              <Th isNumeric>Registered</Th>
              <Th isNumeric>Time (hours)</Th>
            </Tr>
          </Thead>
          <Tbody data-testid="timeRegistrations">
            {data.registrations.map((registration) => (
              <Tr key={registration.id}>
                <Td
                  maxWidth={[200, 200, 400, 600]}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  title={registration.description}
                >
                  {registration.description}
                </Td>
                <Td isNumeric>
                  {new Date(registration.registeredAt).toLocaleDateString(
                    'en-US',
                    { dateStyle: 'short' }
                  )}
                </Td>
                <Td isNumeric>
                  {minutesToHours(registration.timePeriod.value).toLocaleString(
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
