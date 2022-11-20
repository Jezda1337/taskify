import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./menus/AccountMenu";
import NotificationMenu from "./menus/NotificationMenu";
import SearchBarMenu from "./menus/SearchBarMenu";
import SearchBarMobileMenu from "./menus/SearchBarMobileMenu";
import Logo from "../Logo";
import Divider from "@mui/material/Divider";

interface AppBarProps extends MuiAppBarProps {
  toggleDrawer: () => void;
}

const EmptyAppBar = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledAppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const AppBar = ({ toggleDrawer }: AppBarProps) => {
  return (
    <>
      <StyledAppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className="bg-glass"
      >
        <Toolbar className='w-[100vw]'>
          <IconButton
            className="hidden sm:flex mr-10"
            color="inherit"
            aria-label="Toggle side menu"
            onClick={toggleDrawer}
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <Stack ml="auto" direction="row">
            <SearchBarMenu />
          </Stack>

          <Stack ml="auto" direction="row">
            <SearchBarMobileMenu />
            <NotificationMenu />
            <AccountMenu />
          </Stack>
        </Toolbar>
        <Divider />
      </StyledAppBar>
      <EmptyAppBar />
    </>
  );
};

export default AppBar;
