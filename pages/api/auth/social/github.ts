import withMongo from 'server/middleware/withMongo';
import { NextApiHandler } from 'next';
import { buildTokens, setTokens } from 'server/services/token.service';
import { createGithubUser, getUserByEmail, getUserByGithubId } from 'server/services/user.service';
import { getGithubUser } from 'server/adapters/github-adapter';
import { UserProfile } from 'types/auth/user-profile.type';

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  try {
    const githubUser = await getGithubUser(code as string);
    let user: UserProfile | null = await getUserByEmail(githubUser.email);
    if (!user) {
      user = await getUserByGithubId(githubUser.id);
      if (!user) {
        const githubUserBody = {
          fullname: githubUser.name || githubUser.login,
          email: githubUser.email,
          githubUserId: githubUser.id,
          avatar: githubUser.avatar_url,
          hasPassword: false,
        }
        user = await createGithubUser(githubUserBody);
      }
    }

    const { accessToken, refreshToken } = buildTokens(user._id, user.tokenVersion);
    setTokens(req, res, accessToken, refreshToken);
  } catch (error) {
    return res.redirect(`${process.env.CLIENT_URL}/auth/login?error=github`);
  }

  res.redirect(`${process.env.CLIENT_URL}`);
};

export default withMongo(handler);