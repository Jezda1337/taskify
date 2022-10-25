import { NextApiHandler, NextApiRequest } from "next";
import withMongo from "server/middleware/withMongo";
import { buildTokens, setTokens } from "server/services/token.service";
import { getUserByEmail } from "server/services/user.service";
import { LoginReq } from "types/auth/login-req.type";

interface NextApiLoginRequest extends NextApiRequest {
  body: LoginReq;
}

const handler: NextApiHandler = async (req: NextApiLoginRequest, res) => {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Only POST requests here!" })
  }

  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please fill in all fields!" });
  }

  try {
    const user = await getUserByEmail(email);
    if (user) {
      const { accessToken, refreshToken } = buildTokens(user);
      setTokens(req, res, accessToken, refreshToken);
      
      const { id, fullname, email, avatar } = user;
      res.status(200).json({ id, fullname, email, avatar });
    } else {
      res.status(500).json({ message: "Failed to log in!" });
    }

  } catch (error: any) {
    res.status(500).json(error);
  }
};

export default withMongo(handler);