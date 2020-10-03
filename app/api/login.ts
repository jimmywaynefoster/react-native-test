import service from './service';

export const LOGIN_ENDPOINT = '/api/login';
export const LOGIN_EXPECTED_RESPONSE = { token: 'QpwL5tke4Pnpja7X4' };
export const LOGIN_UNEXPECTED_RESPONSE = { error: 'user not found' };

export default function loginAPI({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  return service({
    url: LOGIN_ENDPOINT,
    method: 'POST',
    body: {
      email,
      password,
    },
  });
}
