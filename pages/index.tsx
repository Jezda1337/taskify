import { Button, IconButton } from "@mui/material";
import { axiosClient } from "middleware/axios";
import { withAuthSSR } from "middleware/withAuthSSR";
import { useRouter } from "next/router";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useContext, useEffect } from "react";
import ThemeContext, { ThemeContextType } from "context/theme-context";

export default function Home() {
  const router = useRouter();
  const { dark, setDark } = useContext(ThemeContext) as ThemeContextType;

  const logout = async () => {
    await axiosClient("/auth/logout");
    router.replace("/auth/login");
  };

  return (
    <>
      <h1>Taskify</h1>

      <Button onClick={logout}>Log out</Button>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setDark(!dark)}
        size="medium"
        className="m-0"
      >
        {dark ? <Brightness2Icon /> : <WbSunnyIcon />}
      </IconButton>
    </>
  );
}

export const getServerSideProps = withAuthSSR();
