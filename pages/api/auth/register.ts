
import withMongo from 'server/middleware/withMongo';
import { NextApiHandler, NextApiRequest } from 'next';
import { RegisterReq } from 'types/auth/register-req.type';
import bcrypt from 'bcrypt';
import { buildTokens, setTokens } from 'server/services/token.service';
import { createUser } from 'server/services/user.service';

interface NextApiRegisterRequest extends NextApiRequest {
  body: RegisterReq;
}

const handler: NextApiHandler = async (req: NextApiRegisterRequest, res) => {
  if (req.method !== "POST") {
    return res.status(500).json({ message: "Only POST requests here!" })
  }

  const { fullname, email, password, confirmPassword } = req.body;

  if (!fullname || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userBody = {
      fullname,
      email,
      password: hashedPassword,
      hasPassword: true,
    };

    const user = await createUser(userBody);
    if (user) {
      const { accessToken, refreshToken } = buildTokens(user._id, user.tokenVersion);
      setTokens(req, res, accessToken, refreshToken);
      return res.status(200).json(user);
    }

    return res.status(500).json({ message: "Failed to create a user!" });
  } catch (error: any) {
    if (error.keyPattern?.email) {
      return res.status(500).json({ message: "This email is already in use!" });
    }

    return res.status(500).json(error);
  }
};

export default withMongo(handler);