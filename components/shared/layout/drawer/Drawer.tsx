import React from "react";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import DrawerCollapsedItems from "./DrawerCollapsedItems";
import DrawerExpandedItems from "./DrawerExpandedItems";
import { closedDrawerWidth, openDrawerWidth } from "utils/constants";

interface DrawerProps extends MuiDrawerProps {
  open?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    top: "unset",
    width: open ? openDrawerWidth : closedDrawerWidth,
    overflowX: "hidden",
    maxWidth: 500,
    scrollbarWidth: "thin",
    ...(open ? { ...openedMixin(theme) } : { ...closedMixin(theme) }),
  },
}));

const Drawer = ({ open }: DrawerProps) => {
  return (
    <>
      <StyledDrawer variant="permanent" open={open}>
        {open ? (
          <DrawerExpandedItems />
        ) : (
          <DrawerCollapsedItems direction="column" />
        )}
      </StyledDrawer>
    </>
  );
};

export default Drawer;
