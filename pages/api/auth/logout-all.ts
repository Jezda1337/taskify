import { getCookie } from "cookies-next";
import { NextApiHandler } from "next";
import { Cookies } from "server/enums/cookies.enum";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import { clearTokens } from "server/services/token.service";
import { incrementTokenVersion } from "server/services/user.service";
import jwt from "jsonwebtoken";
import { AccessTokenPayload } from "server/interfaces/token/access-token-payload.interface";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only GET requests here!" })
  }

  const accessToken = getCookie(Cookies.AccessToken, { req, res }) as string;
  const userId = (jwt.decode(accessToken)! as AccessTokenPayload)?.userId;

  try {
    await incrementTokenVersion(userId!);
    clearTokens(req, res);
    res.status(200).json({ message: "Logged out from all devices!" });
  } catch (error) {
    res.status(500).json(error);
  }

};

export default withAuth(withMongo(handler));