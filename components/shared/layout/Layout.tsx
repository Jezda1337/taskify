import React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import AppBar from "./appbar/AppBar";
import Drawer from "./drawer/Drawer";
import DrawerMobile from "./drawer/DrawerMobile";
import { useStorage } from "hooks/useStorage";
import { useMediaQuery, useTheme } from "@mui/material";
import { closedDrawerWidth, openDrawerWidth } from "utils/constants";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [open, setOpen] = useStorage("drawerExpanded", false);
  const { asPath } = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(640));

  const toggleDrawer = () => {
    setOpen((prevValue) => !prevValue);
  };

  return asPath.startsWith("/auth") ? (
    <>{children}</>
  ) : (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Box className="fade-in">
        {isSmallScreen ? <DrawerMobile /> : <Drawer open={open} />}
        <Box
          component="main"
          style={{
            ...(!isSmallScreen && {
              marginLeft: open ? openDrawerWidth : closedDrawerWidth,
            }),
          }}
          className={'ease-in-out duration-[195ms] grow p-6'}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
