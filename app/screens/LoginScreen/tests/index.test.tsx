import 'react-native';
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'fetch-mock-jest';

import { render } from 'utils/testWrapper';

import { LOGIN_ENDPOINT, LOGIN_EXPECTED_RESPONSE, LOGIN_UNEXPECTED_RESPONSE } from 'api/login';

import { HOME } from 'router/routeNames';

import LoginScreen from '../index';
import { API_URL } from '../../../constants';
import {
  AUTH_TOKEN_KEY,
  TEST_ID_EMAIL_INPUT,
  TEST_ID_PASSWORD_INPUT,
  TEST_ID_SUBMIT_BUTTON,
  TEST_ID_SIGN_IN_ERROR,
} from '../constants';

describe('Login Screen', () => {

  // Testing valid login flow
  it('Expect to save token in AsyncStorage & navigate to home screen on successful login', async () => {
    // Mocking navigate method
    const navigate = jest.fn();
    const endPoint = `${API_URL}${LOGIN_ENDPOINT}`;
    fetchMock.post(endPoint, {
      status: 200,
      body: JSON.stringify(LOGIN_EXPECTED_RESPONSE),
    });

    // Dummy data to supply to form
    const email = 'eve.holt@reqres.in';
    const password = 'cityslicka';

    // Getting element
    const { getByTestId } = render(<LoginScreen navigation={{ navigate }} />);
    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    // Formik requires all state changes to be wrapper in async method.
    await waitFor(() => {
      fireEvent.changeText(emailInput, email);
      fireEvent.changeText(passwordInput, password);
    });

    await waitFor(() => {
      fireEvent.press(button);
    });

    // Asserting that API has been called
    expect(fetchMock).toHaveBeenCalledWith(endPoint, {
      body: `{"email":"${email}","password":"${password}"}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    // Asserting screen navigation
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(HOME, {});

    // Asserting token storage in local storage.
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      AUTH_TOKEN_KEY,
      LOGIN_EXPECTED_RESPONSE.token,
    );
  });

  // Testing invalid login flow
  it('Expect to see an Error on unsuccessful login', async () => {
    // Mocking navigate method
    const navigate = jest.fn();
    const endPoint = `${API_URL}${LOGIN_ENDPOINT}`;
    fetchMock.post(endPoint, {
      status: 400,
      body: JSON.stringify(LOGIN_UNEXPECTED_RESPONSE),
    });

    // Dummy data to supply to form
    const email = 'email@email.com';
    const password = 'password';

    // Getting element
    const { getByTestId } = render(<LoginScreen navigation={{ navigate }} />);
    const emailInput = getByTestId(TEST_ID_EMAIL_INPUT);
    const passwordInput = getByTestId(TEST_ID_PASSWORD_INPUT);
    const button = getByTestId(TEST_ID_SUBMIT_BUTTON);

    // Formik requires all state changes to be wrapper in async method.
    await waitFor(() => {
      fireEvent.changeText(emailInput, email);
      fireEvent.changeText(passwordInput, password);
    });

    await waitFor(() => {
      fireEvent.press(button);
    });

    // Asserting that API has been called
    expect(fetchMock).toHaveBeenCalledWith(endPoint, {
      body: `{"email":"${email}","password":"${password}"}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    expect(getByTestId(TEST_ID_SIGN_IN_ERROR)).toBeDefined();
  });

  // Cleaning up fetch mock
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
});
