import { getCookie } from "cookies-next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "server/enums/cookies.enum";
import { verifyAccessToken } from "server/services/token.service";

export const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = getCookie(Cookies.AccessToken, { req, res });
  const token = verifyAccessToken(accessToken as string);
  if (!token) {
    res.status(401).json({ message: "Not signed in" });
  }

  return handler(req, res);
};