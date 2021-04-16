import nextConnect from 'next-connect';

const middleware = nextConnect();

export const getHandler = () => {
  const handler = nextConnect();

  handler.use(middleware);

  return handler;
};
