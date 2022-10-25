import { Button } from "@mui/material";
import { axiosClient } from "middleware/axios";
import { withAuthSSR } from "middleware/withAuthSSR";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const logout = () => {
    axiosClient("/auth/logout").then((res) => {
      console.log("logged out");
      router.replace("/auth/login");
    });
  };
  return (
    <>
      <h1>Taskify</h1>

      <Button onClick={logout}>Log out</Button>
    </>
  );
}

export const getServerSideProps =  withAuthSSR()