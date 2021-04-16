import { NextApiRequest, NextApiResponse } from 'next';
import { getHandler } from 'server/middleware';
import { setRefreshToken } from 'server/utils';

const handler = getHandler();

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  // clear out http only cookie
  setRefreshToken(req, res, null);

  res.status(200);
  res.send({ message: 'Success' });
});

export default handler;
