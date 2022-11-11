
import withMongo from 'server/middleware/withMongo';
import { NextApiHandler, NextApiRequest } from 'next';
import { getUserByEmail, updateUser } from 'server/services/user.service';
import { UpdateUserReq } from 'server/interfaces/user/update-user-req.interface';
import { withAuth } from 'server/middleware/withAuth';
import jwt from "jsonwebtoken";
import { getCookie } from 'cookies-next';
import { Cookies } from 'server/enums/cookies.enum';
import { AccessTokenPayload } from 'server/interfaces/token/access-token-payload.interface';

interface NextApiUpdateUserRequest extends NextApiRequest {
  body: UpdateUserReq;
}

const handler: NextApiHandler = async (req: NextApiUpdateUserRequest, res) => {
  if (req.method !== "PUT") {
    return res.status(500).json({ message: "Only PUT requests here!" })
  }

  try {
    const accessToken = getCookie(Cookies.AccessToken, { req, res }) as string;
    const userId = (jwt.decode(accessToken) as AccessTokenPayload)!.userId;

    const { email } = req.body;
    if (email) {
      const user = await getUserByEmail(email);
      if (user && String(user._id) !== userId) {
        return res.status(500).json({ message: "Email already in use!" });
      }
    }

    const updatedUser = await updateUser(userId, req.body);
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    }

    return res.status(500).json({ message: "Failed to update user!" });
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export default withAuth(withMongo(handler));