import { Button } from "@mui/material";
import axios from "axios";
import { withAuthSSR } from "middleware/withAuthSSR";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const logout = () => {
    axios.get("/api/auth/logout").then((res) => {
      console.log("logged out");
      router.replace("/login");
    });
  }
  return (
    <>
      <h1>Taskify</h1>
      
      <Button onClick={logout}>Log out</Button>
    </>
  );
}

export const getServerSideProps = withAuthSSR()