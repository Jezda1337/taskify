import { NextApiHandler } from "next";
import { Cookies } from "server/enums/cookies.enum";
import withMongo from "server/middleware/withMongo";
import { clearTokens, refreshTokens, setTokens, verifyRefreshToken } from "server/services/token.service";
import { getUserById } from "server/services/user.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(500).json({ message: "Only GET requests here!" })
  }

  const oldToken = req.cookies[Cookies.RefreshToken]!;
  try {
    const currentRefreshToken = verifyRefreshToken(oldToken);
    if(currentRefreshToken) {
      const user = await getUserById(currentRefreshToken.userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      const { accessToken, refreshToken } = refreshTokens(currentRefreshToken, user.tokenVersion);
      setTokens(req, res, accessToken, refreshToken);
    }
    
  } catch (error) {
    clearTokens(req, res);
    return res.status(500).json(error);
  }

  res.end();
};

export default withMongo(handler);