import {
  Badge,
  Button,
  ButtonGroup,
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

export default function ProjectsPage() {
  return (
    <VStack padding={2} gap={2} alignItems="flex-start">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List of projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Project name</Th>
              <Th>Deadline</Th>
              <Th isNumeric>Time spent</Th>
              <Th>Project status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Project ABC</Td>
              <Td isNumeric>12/12-2022</Td>
              <Td isNumeric>25</Td>
              <Td>
                <Badge colorScheme="green">Open</Badge>
              </Td>
              <Td>
                <ButtonGroup>
                  <Button>Register time</Button>
                </ButtonGroup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
