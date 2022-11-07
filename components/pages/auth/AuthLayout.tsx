import { Button, CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const [githubLoading, setGithubLoading] = useState(false);

  return (
    <>
      <div className="flex min-h-screen bg-no-repeat bg-center bg-cover bg-[url('/images/blob.svg')]">
        <div className="flex w-full ">
          <div className="flex flex-1 justify-center">
            <div className="fade-scale-in max-w-[450px] min-w-[200px] w-full flex flex-col justify-center items-center min-h-screen sm:min-h-0 m-auto px-6 py-12 rounded-md bg-glass">
              {children}
              <hr className="w-full border-primary" />
              <div className="mt-4 text-center">or sign in with</div>
              <Button
                variant="outlined"
                className="mt-4 min-w-[120px]"
                component={"a"}
                href={process.env.NEXT_PUBLIC_GITHUB_URL}
                startIcon={!githubLoading ? <GitHubIcon /> : null}
                onClick={() => setGithubLoading(true)}
              >
                {!githubLoading ? 'Github' : <CircularProgress size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
