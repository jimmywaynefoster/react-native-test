/*
 *
 * LoginScreen
 *
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import loginAPI from 'api/login';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { HOME } from 'router/routeNames';
import FullScreenLoader from 'theme/FullScreenLoader';
import Text from 'theme/Text';
import { AUTH_TOKEN_KEY } from './constants';

import EmailPasswordForm from './EmailPasswordForm';

import style from './style';

import { LoginScreenProps } from './types';

interface IScreenState {
  processing?: boolean;
  success?: boolean;
  error?: boolean;
}

function LoginScreen(props: LoginScreenProps) {
  const [state, set] = useState<IScreenState>({
    processing: false,
    success: false,
    error: false,
  });
  const setState = (nextState: IScreenState) => set({ ...state, ...nextState });

  const onSubmit = async (value: { email: string; password: string }) => {
    setState({
      processing: true,
      error: false,
      success: false,
    });
    try {
      const resData = await loginAPI({
        email: value.email,
        password: value.password,
      });
      if (resData?.token) {
        await AsyncStorage.setItem(
          AUTH_TOKEN_KEY,
            resData?.token,
        );
        setState({
          processing: false,
          success: true,
        });
        return;
      }
      throw Error('Something went wrong');
    } catch (e) {
      // console.log(e);
      setState({
        processing: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    if (state.success) {
      props.navigation.navigate(HOME, {});
    }
  }, [props.navigation, state.success]);

  return (
    <View style={style.container}>
      <EmailPasswordForm onSubmit={onSubmit} />
      {state.processing ? <FullScreenLoader /> : null}
      {state.error ? <Text testID={'signInError'}>Something went wrong</Text> : null}
    </View>
  );
}

export default LoginScreen;
