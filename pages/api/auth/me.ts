import { getCookie } from "cookies-next";
import  jwt from "jsonwebtoken";
import { NextApiHandler } from "next";
import { Cookies } from "server/enums/cookies.enum";
import { AccessTokenPayload } from "server/interfaces/token/access-token-payload.interface";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import { getUserById } from "server/services/user.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only GET requests here!" })
  }
  
  const accessToken = getCookie(Cookies.AccessToken, { req, res }) as string;
  const userId = (jwt.decode(accessToken)! as AccessTokenPayload)?.userId;
  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  res.json(user);
};

export default withAuth(withMongo(handler));