import { getCookie } from "cookies-next";
import { NextApiHandler } from "next";
import { Cookies } from "server/enums/cookies.enum";
import withMongo from "server/middleware/withMongo";
import { clearTokens, refreshTokens, setTokens, verifyRefreshToken } from "server/services/token.service";
import { getUserById } from "server/services/user.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only GET requests here!" })
  }

  const oldToken = getCookie(Cookies.RefreshToken, { req, res }) as string;
  try {
    const currentRefreshToken = verifyRefreshToken(oldToken);
    const user = await getUserById(currentRefreshToken.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { accessToken, refreshToken } = refreshTokens(currentRefreshToken, user.tokenVersion);
    setTokens(req, res, accessToken, refreshToken);

    const { id, fullname, email, avatar } = user;
    res.status(200).json({ id, fullname, email, avatar });
  } catch (error) {
    clearTokens(req, res);
    res.status(500).json({ message: "Unable to refresh tokens" });
  }

  res.end();
};

export default withMongo(handler);