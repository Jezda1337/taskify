import axios from "axios";
import { GithubAccessTokenResponse } from "server/interfaces/user/github/github-access-token-response.interface";
import { GithubUserResponse } from "server/interfaces/user/github/github-user-response.interface";
import { GithubUser } from "server/interfaces/user/github/github-user.interface";

export async function getGithubUser(code: string): Promise<GithubUser> {
  const accessToken = await getToken(code);
  return getUser(accessToken);
}

async function getToken(code: string) {
  const { data: accessTokenResponse } = await axios.post<GithubAccessTokenResponse>(
    process.env.GITHUB_TOKEN_URL!, 
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  
  return accessTokenResponse.access_token;
}

async function getUser(accessToken: string) {
  const { data: userResponse } = await axios.get<GithubUserResponse>(process.env.GITHUB_USER_URL!, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return userResponse;
}