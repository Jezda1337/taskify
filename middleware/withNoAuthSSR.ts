import { GetServerSideProps } from 'next'
import { UserDocument } from 'server/interfaces/user/user-document.interface'

import { fetcherSSR } from './fetcherSSR'

export const withNoAuthSSR = () => {
  const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const [error, user] = await fetcherSSR<UserDocument>(req, res, `${process.env.API_URL}/auth/me`);
    if (error || !user) return { props: {} };

    return { redirect: { statusCode: 307, destination: '/' } };
  }

  return getServerSideProps;
}