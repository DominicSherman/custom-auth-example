import { NextApiRequest, NextApiResponse } from 'next';
import { getHandler } from 'server/middleware';
import { setRefreshToken } from 'server/utils';
import { firebaseAuth } from 'shared/firebase';
import { prisma } from 'prisma/client';

const handler = getHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    // sign user in with Firebase and get user information out of DB
    const [result, user] = await Promise.all([
      firebaseAuth().signInWithEmailAndPassword(email, password),
      prisma.user.findUnique({
        where: {
          email,
        },
      }),
    ]);

    // if they don't exist in either firebase or the DB, throw an error
    if (!result.user || !user) {
      throw new Error('No user found.');
    }

    const authUser = result.user;
    const accessToken = await authUser.getIdToken();

    // set or overwrite refresh token
    setRefreshToken(req, res, authUser.refreshToken);

    // return data
    res.status(200);
    res.send({
      accessToken,
      refreshToken: authUser.refreshToken,
      id: user.id,
    });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      res.status(404);
      res.send({ message: 'No account found for this email.' });
    } else {
      res.status(500);
      res.send({ message: error });
    }
  }
});

export default handler;
