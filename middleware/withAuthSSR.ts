import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { UserDocument } from 'server/interfaces/user/user-document.interface';
import { QueryResponse } from './fetcher';
import { fetcherSSR } from './fetcher-ssr';

interface GetPropsParams {
  context: GetServerSidePropsContext
  fetcher: <T>(url: string) => Promise<QueryResponse<T>>
  user: UserDocument
}

export const withAuthSSR = <T>(
  getProps?: (params: GetPropsParams) => Promise<GetServerSidePropsResult<T>>
) => {
  const getServerSideProps: GetServerSideProps = async context => {
    const fetcher = <T>(url: string) => fetcherSSR<T>(context.req, context.res, url)

    const [error, user] = await fetcher<UserDocument>(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
    if (error || !user) return { redirect: { statusCode: 307, destination: '/login' } }

    const result = getProps ? await getProps({ context, fetcher, user }) : {}
    const props = (result as any).props || {}

    return { ...result, props: { user, ...props } }
  }

  return getServerSideProps
}