import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { server } from '../../mocks/server';
import SharedProviders from '../SharedProviders';
import { mockProjectOpenLittleTime, projectsHandlers } from './projects.mock';
import { RegisterTimeDialogButton } from './RegisterTimeDialogButton';

describe('RegisterTimeDialogButton', () => {
  it('should open a dialog when clicked', () => {
    // arrange
    render(
      <SharedProviders>
        <RegisterTimeDialogButton project={mockProjectOpenLittleTime} />
      </SharedProviders>
    );

    // act
    const showDialogButton = screen.getByRole('button', {
      name: /add/i,
      exact: false,
    });
    fireEvent.click(showDialogButton);

    // assert
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('should display an error message if no description is provided', async () => {
    // arrange
    render(
      <SharedProviders>
        <RegisterTimeDialogButton project={mockProjectOpenLittleTime} />
      </SharedProviders>
    );

    const showDialogButton = screen.getByRole('button', {
      name: /add/i,
      exact: false,
    });
    fireEvent.click(showDialogButton);

    // act
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    // assert
    const descriptionWithErrorMessage = await screen.findByRole('textbox', {
      name: /description/i,
      description: /must fill in a description\./i,
    });

    expect(descriptionWithErrorMessage).toBeDefined();
  });

  it('should display an error message if no time spent is provided', async () => {
    // arrange
    render(
      <SharedProviders>
        <RegisterTimeDialogButton project={mockProjectOpenLittleTime} />
      </SharedProviders>
    );

    const showDialogButton = screen.getByRole('button', {
      name: /add/i,
      exact: false,
    });
    fireEvent.click(showDialogButton);

    const timeSpent = screen.getByRole('combobox', {
      name: /time spent/i,
      exact: false,
    }) as HTMLInputElement;

    fireEvent.change(timeSpent, { target: { value: '' } });

    // act
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    // assert
    const timeSpentWithErrorMessage = await screen.findByRole('combobox', {
      description: /must register how much time spent\./i,
    });

    expect(timeSpentWithErrorMessage).toBeDefined();
  });

  it('should display an error message if less than 30 mins is provided', async () => {
    // arrange
    render(
      <SharedProviders>
        <RegisterTimeDialogButton project={mockProjectOpenLittleTime} />
      </SharedProviders>
    );

    const showDialogButton = screen.getByRole('button', {
      name: /add/i,
      exact: false,
    });
    fireEvent.click(showDialogButton);

    const timeSpent = screen.getByRole('combobox', {
      name: /time spent/i,
      exact: false,
    }) as HTMLInputElement;

    fireEvent.change(timeSpent, { target: { value: '29' } });

    // act
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    // assert
    const timeSpentWithErrorMessage = await screen.findByRole('combobox', {
      description: /a minimum of 30 mins must be registered\./i,
    });

    expect(timeSpentWithErrorMessage).toBeDefined();
  });

  it('should submit registered time and close dialog', async () => {
    // arrange
    server.use(...projectsHandlers);

    render(
      <SharedProviders>
        <RegisterTimeDialogButton project={mockProjectOpenLittleTime} />
      </SharedProviders>
    );

    const showDialogButton = screen.getByRole('button', {
      name: /add/i,
      exact: false,
    });
    fireEvent.click(showDialogButton);

    const dialog = screen.getByRole('dialog');

    // act
    const timeSpent = screen.getByRole('combobox', {
      name: /time spent/i,
      exact: false,
    }) as HTMLInputElement;

    fireEvent.change(timeSpent, { target: { value: '120' } });

    const description = screen.getByRole('textbox', {
      name: /description/i,
    });

    fireEvent.change(description, { target: { value: 'a description' } });

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    // assert
    await waitForElementToBeRemoved(dialog);
  });
});
