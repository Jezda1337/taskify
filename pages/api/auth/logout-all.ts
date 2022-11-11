import { NextApiHandler } from "next";
import { Cookies } from "server/enums/cookies.enum";
import { AccessTokenPayload } from "server/interfaces/token/access-token-payload.interface";
import { withAuth } from "server/middleware/withAuth";
import withMongo from "server/middleware/withMongo";
import { clearTokens } from "server/services/token.service";
import { incrementTokenVersion } from "server/services/user.service";
import  jwt from "jsonwebtoken";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(500).json({ message: "Only GET requests here!" })
  }

  try {
    const accessToken = req.cookies[Cookies.AccessToken]!;
    const userId = (jwt.decode(accessToken) as AccessTokenPayload)!.userId;
    await incrementTokenVersion(userId);
    clearTokens(req, res);
    return res.status(200).json({ message: "Logged out from all devices!" });
  } catch (error) {
    return res.status(500).json(error);
  }

};

export default withAuth(withMongo(handler));