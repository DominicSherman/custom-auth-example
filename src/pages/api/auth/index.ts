import { getRefreshToken, setRefreshToken } from 'server/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { getHandler } from 'server/middleware';

const handler = getHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // get refresh token out of cookie
  const refreshToken = getRefreshToken(req, res);

  // user not logged in if no refresh token
  if (!refreshToken) {
    res.status(401);
    res.send({ error: 'No refresh token in storage.' });

    return;
  }

  // refresh token
  const response = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
    {
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  // get updated refresh and access tokens
  const data = await response.json();

  if (data.refresh_token) {
    setRefreshToken(req, res, data.refresh_token);
  }

  res.status(200);
  res.send({
    accessToken: data.id_token,
    refreshToken: data.refresh_token,
    id: data.user_id,
  });
});

export default handler;
