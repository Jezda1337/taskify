import ProfileDetailTabs from "@/components/pages/people/profile/ProfileDetailTabs";
import ProfileInfo from "@/components/pages/people/profile/ProfileInfo";
import { Container, Grid, Typography } from "@mui/material";
import { withAuthSSR } from "middleware/withAuthSSR";
import { ParsedUrlQuery } from "querystring";
import { UserProfile } from "types/auth/user-profile.type";

type ProfileProps = {
  user: UserProfile;
  profile: UserProfile;
};
export default function Profile({ profile, user }: ProfileProps) {
  if (!profile)
    return (
      <Typography component={"h1"} variant="h3">
        This user does not exist! <span className="text-primary">:(</span>{" "}
      </Typography>
    );

  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <ProfileInfo profile={profile} user={user} />
          </Grid>
          <Grid item xs={12} md={6} lg={8} xl={9}>
            <ProfileDetailTabs />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

interface ParamsWithId extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps = withAuthSSR(
  async ({ context, user, fetcher }) => {
    const { id } = context.params as ParamsWithId;
    if (user?._id === id) {
      return {
        props: {
          profile: user,
        },
      };
    }

    const [error, fetchedUser] = await fetcher<UserProfile>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
    );

    if (error) {
      return {
        redirect: {
          destination: "/", //change this to "NETWORK ERROR PAGE" eventually :D
          statusCode: 307,
        },
      };
    }

    return {
      props: {
        profile: fetchedUser,
      },
    };
  }
);
