
import withMongo from 'server/middleware/withMongo';
import { NextApiHandler } from 'next';
import { buildTokens, setTokens } from 'server/services/token.service';
import { createGithubUser, getUserByGithubId } from 'server/services/user.service';
import { getGithubUser } from 'server/adapters/github-adapter';
import { WithId } from 'mongodb';
import { UserProfile } from 'types/auth/user-profile.type';

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  const githubUser = await getGithubUser(code as string);
  let user: WithId<UserProfile> | UserProfile | null = await getUserByGithubId(githubUser.id);
  if (!user) {
    const githubUserBody = {
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