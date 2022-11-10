import { NextApiHandler, NextApiRequest } from "next";
import withMongo from "server/middleware/withMongo";
import { buildTokens, setTokens } from "server/services/token.service";
import { getUserByEmail } from "server/services/user.service";
import { LoginReq } from "types/auth/login-req.type";
import bcrypt from 'bcrypt';

interface NextApiLoginRequest extends NextApiRequest {
  body: LoginReq;
}

const handler: NextApiHandler = async (req: NextApiLoginRequest, res) => {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Only POST requests here!" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }

  try {
    const user = await getUserByEmail(email);
    if (user) {
      const { accessToken, refreshToken } = buildTokens(user);
      setTokens(req, res, accessToken, refreshToken);

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Incorrect password");
      }

      const { _id, fullname, email, avatar } = user;
      return res.status(200).json({ _id, fullname, email, avatar });
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }

  return res.status(500).json({ message: "Failed to log in!" });
};

export default withMongo(handler);
