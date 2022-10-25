
import withMongo from 'server/middleware/withMongo';
import { NextApiHandler, NextApiRequest } from 'next';
import { RegisterReq } from 'types/auth/register-req.type';
import bcrypt from 'bcrypt';
import { buildTokens, setTokens } from 'server/services/token.service';
import { createGithubUser, createUser, getUserByGithubId } from 'server/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { getGithubUser } from 'server/adapters/github-adapter';
import { WithId } from 'mongodb';
import { UserDocument } from 'server/interfaces/user/user-document.interface';

interface NextApiRegisterRequest extends NextApiRequest {
  body: RegisterReq;
}

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  const githubUser = await getGithubUser(code as string);
  let user: WithId<UserDocument> | UserDocument | null = await getUserByGithubId(githubUser.id);
  if (!user) {
    const githubUserBody = {
      id: uuidv4(),
      fullname: githubUser.name,
      email: githubUser.email,
      githubUserId: githubUser.id,
      avatar: githubUser.avatar_url,
    }
    user = await createGithubUser(githubUserBody);
  }

  const { accessToken, refreshToken } = buildTokens(user);
  setTokens(req, res, accessToken, refreshToken);

  res.redirect(`${process.env.CLIENT_URL}`);
};

export default withMongo(handler);