import { Button } from "@mui/material";

type Props = {
  children: React.ReactNode
};

const AuthLayout = ({ children }: Props) => {
  const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const githubRedirect = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL;
  const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${githubId}&redirect_uri=${githubRedirect}`;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-md m-auto ">
        {children}
        <div className="mt-4 text-center">or login with</div>
        <Button
          fullWidth
          variant="outlined"
          className="mt-4"
          component={"a"}
          href={gitHubUrl}
        >
          Github
        </Button>
      </div>
    </>
  );
};

export default AuthLayout;
