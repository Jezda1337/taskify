import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { Cookies } from 'server/enums/cookies.enum';

export const preventAuth = <T>(
) => {
  const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const accessToken = getCookie(Cookies.AccessToken, { req, res });
    if (accessToken) {
      return { redirect: { statusCode: 307, destination: '/' } };
    }
    return { props: {} }
  }

  return getServerSideProps;
}
