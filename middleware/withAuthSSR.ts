import { IncomingMessage } from 'http';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { UserProfile } from 'types/auth/user-profile.type';
import { axiosSSR } from './axios';

type QueryResponse<T> = [error: string | null, data: T | null]
interface GetPropsParams {
  context: GetServerSidePropsContext;
  fetcher: <T>(url: string) => Promise<QueryResponse<T>>;
  user: UserProfile;
}

export const withAuthSSR = <T>(
  getProps?: (params: GetPropsParams) => Promise<GetServerSidePropsResult<T>>
) => {
  const getServerSideProps: GetServerSideProps = async context => {
    const fetcher = <T>(url: string) => fetcherSSR<T>(context.req, url);
    // GET USER
    const [error, user] = await fetcher<UserProfile>(`/auth/me`);
    if (error || !user) return { redirect: { statusCode: 307, destination: '/auth/login' } };
    // GET PROPS
    const result = getProps ? await getProps({ context, fetcher, user }) : {};
    const props = (result as any).props || {};
    // RETURN USER AND PROPS
    return { ...result, props: { user, ...props } }
  }

  return getServerSideProps;
}

const fetcherSSR = async <T>(req: IncomingMessage, url: string): Promise<QueryResponse<T>> => {
  try {
    const { data } = await axiosSSR.get(url, { headers: { cookie: req.headers.cookie! } });
    return [null, data];
  } catch (error: any) {
    return [error, null];
  }
}