import cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import nextCookie from 'next-cookies';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { v4 } from 'uuid';

let accessToken = '';

export const getAccessToken = (): string => accessToken;

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const getUserId = (): string => cookie.get('id');

export const setUserId = (id: string): void => {
  cookie.set('id', id, { expires: 365 });
};

export const requireAuthentication: GetServerSideProps<{
  id: string | null;
}> = async (context) => {
  const { id, refreshToken } = nextCookie(context);

  if (!refreshToken || !id) {
    // user is not logged in
    context.res.writeHead(302, {
      Location: '/login',
    });

    context.res.end();

    return {
      props: {
        id: null,
      },
    };
  }

  return {
    props: {
      id,
    },
  };
};

const setUserData = (data: { accessToken: string; id: string }): void => {
  setAccessToken(data.accessToken);
  setUserId(data.id);
};

const clearUserData = (): void => {
  setAccessToken('');
  cookie.remove('id');
};

export const useLogin = (): [
  (data: { email: string; password: string }) => Promise<void>,
  boolean
] => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong.');
      }

      const data = await response.json();

      if (data) {
        setUserData(data);

        await router.push('/');
      }
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
      });
    }

    setLoading(false);
  };

  return [login, loading];
};

export const useCreateAccount = (): [(user: any) => Promise<void>, boolean] => {
  const router = useRouter();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const createAccount = async (user: any): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/create-account', {
        method: 'POST',
        body: JSON.stringify({
          ...user,
          email: user.email.trim(),
          id: v4(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong.');
      }

      const data = await response.json();

      if (data) {
        setUserData(data);

        await router.push('/');
      }
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
      });
    }

    setLoading(false);
  };

  return [createAccount, loading];
};

export const logout = async (): Promise<void> => {
  await Router.push('/login');
  clearUserData();
  await fetch('/api/auth/logout', {
    method: 'POST',
  });
};

export const tryToRefreshAccessToken = async (): Promise<void> => {
  // get updated refresh and access tokens
  const response = await fetch('/api/auth');
  const data = await response.json();

  // set data
  if (data.accessToken) {
    setUserData(data);
  } else {
    await logout();
  }
};
