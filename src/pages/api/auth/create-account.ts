import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'prisma/client';
import { getHandler } from 'server/middleware';
import { setRefreshToken } from 'server/utils';
import { firebaseAdminAuth, firebaseAuth } from 'shared/firebase';
import { v4 } from 'uuid';

import { Provider } from '.prisma/client';

const handler = getHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name, password } = req.body;
    const id = v4();

    const existingUser = await prisma.user.findFirst({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });

    // check to make sure we aren't duplicating accounts
    if (existingUser) {
      res.status(409);
      res.send({ message: 'This email is already in use.' });

      return;
    }

    // create user in Firebase
    await firebaseAdminAuth().createUser({
      displayName: name,
      email,
      password,
      uid: id,
    });

    // sign in with user info to get auth information
    const result = await firebaseAuth().signInWithEmailAndPassword(
      email,
      password
    );

    if (!result.user) {
      throw new Error('There was an error creating your user.');
    }

    const authUser = result.user;

    // add user in DB and get auth token back
    const [, accessToken] = await Promise.all([
      prisma.user.create({
        data: {
          email,
          name,
          provider: Provider.EMAIL,
          id,
        },
      }),
      authUser.getIdToken(),
    ]);

    // set refresh token in http only cookie
    setRefreshToken(req, res, authUser.refreshToken);

    // return data
    res.status(200);
    res.send({
      accessToken,
      refreshToken: authUser.refreshToken,
      id,
    });
  } catch (error) {
    res.status(500);
    res.send({ message: error });
  }
});

export default handler;
