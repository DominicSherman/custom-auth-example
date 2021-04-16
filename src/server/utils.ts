import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

const REFRESH_TOKEN_KEY = 'refreshToken';

export const setRefreshToken = (
  req: NextApiRequest,
  res: NextApiResponse,
  refreshToken: string | null
): void => {
  const cookies = new Cookies(req, res);

  const expirationDate = new Date();

  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: expirationDate });
};

export const getRefreshToken = (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);

  return cookies.get(REFRESH_TOKEN_KEY);
};
