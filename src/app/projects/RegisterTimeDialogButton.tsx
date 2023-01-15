import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  VStack,
  FormErrorMessage,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Formik } from 'formik';
import { Project, useAddTimeRegistration } from './projects.service';

import * as yup from 'yup';

export interface RegisterTimeDialogButtonProps {
  project: Project;
}

const registerTimeSchema = yup.object().shape({
  description: yup.string().required('Must fill in a description.'),
  timeSpent: yup
    .number()
    .min(30, 'A minimum of 30 mins must be registered.')
    .required('Must register how much time spent.'),
});

export function RegisterTimeDialogButton({
  project,
}: RegisterTimeDialogButtonProps) {
  const { getDisclosureProps, getButtonProps, onClose, isOpen } =
    useDisclosure();

  const {
    mutateAsync: addTimeRegistration,
    isLoading: isTimeRegistrationLoading,
  } = useAddTimeRegistration();

  const toast = useToast();

  return (
    <>
      <Button
        variant="solid"
        colorScheme="blue"
        disabled={project.status === 'closed'}
        {...getButtonProps()}
      >
        Add new time registration
      </Button>

      <Modal {...getDisclosureProps()} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Time Registration Form</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              description: '',
              timeSpent: 30,
            }}
            validationSchema={registerTimeSchema}
            onSubmit={(values) => {
              addTimeRegistration({
                projectId: project.id,
                description: values.description,
                timeSpentMinutes: values.timeSpent,
              })
                .then(onClose)
                .catch((e) =>
                  toast({
                    title: 'Failed to register time',
                    description: e.message,
                    status: 'error',
                  })
                );
            }}
          >
            {({ submitForm, errors }) => (
              <>
                <ModalBody>
                  <VStack gap={4}>
                    <p>
                      Add new time registration to <b>{project.name}</b>{' '}
                      project.
                    </p>

                    <FormControl isInvalid={!!errors.description}>
                      <FormLabel>Description</FormLabel>
                      <Field as={Textarea} name="description" />

                      <FormHelperText>
                        How the registered time was spent.
                      </FormHelperText>
                      <ErrorMessage
                        name="description"
                        component={FormErrorMessage}
                      ></ErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.timeSpent}>
                      <FormLabel>Time spent (minutes)</FormLabel>
                      <Field
                        as={Input}
                        name="timeSpent"
                        list="timeSpentSuggestions"
                      ></Field>

                      <datalist id="timeSpentSuggestions">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1 hour 30 minutes</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                        <option value="240">4 hours</option>
                        <option value="300">5 hours</option>
                        <option value="360">6 hours</option>
                        <option value="420">7 hours</option>
                        <option value="480">8 hours</option>
                      </datalist>

                      <FormHelperText>
                        How much time spent you spent on the project.
                      </FormHelperText>
                      <ErrorMessage
                        name="timeSpent"
                        component={FormErrorMessage}
                      ></ErrorMessage>
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                    onClick={submitForm}
                    isLoading={isTimeRegistrationLoading}
                  >
                    Submit
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
