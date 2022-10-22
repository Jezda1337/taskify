
import withMongo from 'server/middleware/withMongo';
import { NextApiHandler, NextApiRequest } from 'next';
import { RegisterReq } from 'types/auth/register-req.type';
import bcrypt from 'bcrypt';
import { buildTokens, setTokens } from 'server/services/token.service';
import { createUser } from 'server/services/user.service';
import { v4 as uuidv4 } from 'uuid';

interface NextApiRegisterRequest extends NextApiRequest {
  body: RegisterReq;
}

const handler: NextApiHandler = async (req: NextApiRegisterRequest, res) => {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Only POST requests here!" })
  }

  const { fullname, email, password, confirmPassword } = req.body;

  if (!fullname || !email || !password || !confirmPassword) {
    res.status(400).json({ message: "Please fill in all fields!" });
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userBody = {
      id: uuidv4(),
      fullname,
      email,
      password: hashedPassword
    };

    const user = await createUser(userBody);
    if (user) {
      const { accessToken, refreshToken } = buildTokens(user);
      setTokens(req, res, accessToken, refreshToken);
      res.status(200).json(user);
    }

    res.status(500).json({ message: "Failed to create a user!" });
  } catch (error: any) {
    if (error.keyPattern?.email) {
      res.status(500).json({ message: "This email is already in use!" });
    }

    res.status(500).json(error);
  }
};

export default withMongo(handler);