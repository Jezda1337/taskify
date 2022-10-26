import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
// import LoginIcon from '@mui/icons-material/Login';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const githubId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const githubRedirect = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL;
  const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${githubId}&redirect_uri=${githubRedirect}`;

  return (
    <>
      <div className="flex w-full ">
        <div className="flex flex-1 justify-center">
          <div className="fade-scale-in max-w-[450px] min-w-[200px] w-full flex flex-col justify-center items-center min-h-screen sm:min-h-0 m-auto px-6 py-12 rounded-md backdrop-blur-lg bg-black/70">
            {children}
            <hr className="w-full border-primary" />
            <div className="mt-4 text-center">or sign in with</div>
            <Button
              variant="outlined"
              className="mt-4"
              component={"a"}
              href={gitHubUrl}
              startIcon={<GitHubIcon />}
            >
              Github
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
