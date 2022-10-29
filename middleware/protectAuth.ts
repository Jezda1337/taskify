import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { Cookies } from 'server/enums/cookies.enum';
import { verifyAccessToken } from 'server/services/token.service';

export const protectAuth = <T>(
) => {
  const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const accessToken = getCookie(Cookies.AccessToken, { req, res });
    if (accessToken) {
      const tokenVerified = verifyAccessToken(accessToken as string);
      if (tokenVerified) {
        return { redirect: { statusCode: 307, destination: '/' } };
      }
    }
    return { props: {} }
  }

  return getServerSideProps;
}
