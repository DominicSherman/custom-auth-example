import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { useLogin } from '../client/services/auth-service';

const Login: FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const [login, loading] = useLogin();
  const onSubmit = handleSubmit(login);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-px">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className={`input ${errors['email'] ? 'input-error' : ''}`}
              id="email"
              name="email"
              placeholder="Email"
              ref={register({ required: true })}
              type="email"
            />
          </div>
          <div className="space-y-px">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className={`input ${errors['password'] ? 'input-error' : ''}`}
              id="password"
              name="password"
              placeholder="Password"
              ref={register({ required: true })}
              type="password"
            />
          </div>
          <div className="w-full justify-center flex flex-row">
            <p className="mr-4">Don't have an account?</p>
            <Link href="/create-account">
              <p className="text-blue-500 cursor-pointer">Create an account</p>
            </Link>
          </div>
          <div>
            <button
              className={`group btn relative w-full flex justify-center py-2 px-4 ${
                loading ? 'opacity-70' : ''
              }`}
              disabled={loading}
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
