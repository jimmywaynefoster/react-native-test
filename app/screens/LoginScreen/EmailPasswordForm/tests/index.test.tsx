import 'react-native';
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { render } from 'utils/testWrapper';
import EmailPasswordForm from '../index';
import {
  TEST_ID_EMAIL_INPUT,
  TEST_ID_PASSWORD_INPUT,
  TEST_ID_SUBMIT_BUTTON,
} from '../../constants';

describe('<EmailPasswordForm />', () => {
  it('Expect to show email & password required', async () => {
    // Grabbing our parent component
    const { getByTestId } = render(
      <EmailPasswordForm onSubmit={() => null} />,
    );

    // Grabbing our input & button components
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    await waitFor(() => {
      fireEvent.press(button);

      // We have emailInput_ERROR component that only renders when error is there
      expect(getByTestId('emailInput_ERROR')).toBeDefined();
      // We have passwordInput_ERROR component that only renders when error is there
      expect(getByTestId('passwordInput_ERROR')).toBeDefined();
    });
  });

  it('Expect to call handle submit with email & password', async () => {
    // Dummy inputs
    const email = 'email@email.com';
    const password = 'qwerty1234';

    // Expected output
    const expectedOutput = {
      email,
      password,
    };
    let output = {};

    // Mock onSubmit method that we are expecting will be executed
    const onSubmit = jest.fn((data) => (output = data));

    // Rendering our component & grabbing required nodes.
    const { getByTestId } = render(
      <EmailPasswordForm onSubmit={onSubmit} />,
    );
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);
    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);

    // Testing behaviors
    await waitFor(() => {
      fireEvent.changeText(emailInput, email);
      expect(emailInput.props.value).toBe(email);

      fireEvent.changeText(passwordInput, password);
      expect(passwordInput.props.value).toBe(password);

      /**
       * Here we are asserting that onSubmit is not just called
       * but it is called with expected output.
       */
      fireEvent.press(button);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(output).toEqual(expectedOutput);
    });
  });
});
