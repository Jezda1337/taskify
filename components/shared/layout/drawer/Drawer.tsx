import React from "react";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import DrawerCollapsedItems from "./DrawerCollapsedItems";
import DrawerExpandedItems from "./DrawerExpandedItems";

interface DrawerProps extends MuiDrawerProps {
  open?: boolean;
}
const openDrawerWidth = 240;
const closedDrawerWidth = 64;

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

const EmptyDrawer = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  width: open ? openDrawerWidth : closedDrawerWidth,
  ...(open ? { ...openedMixin(theme) } : { ...closedMixin(theme) }),
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    top: "unset",
    width: open ? openDrawerWidth : closedDrawerWidth,
    overflowX: "hidden",
    maxWidth: 500,
    ...(open ? { ...openedMixin(theme) } : { ...closedMixin(theme) }),
  },
  whiteSpace: "nowrap",
  flexShrink: 0,
  overflowX: "hidden",
  maxWidth: 500,
  ...(open ? { ...openedMixin(theme) } : { ...closedMixin(theme) }),
}));

const Drawer = ({ open }: DrawerProps) => {
  return (
    <>
      <EmptyDrawer open={open} />
      <StyledDrawer variant="permanent" open={open} >
        { open ? <DrawerExpandedItems /> : <DrawerCollapsedItems direction="column" /> }
      </StyledDrawer>
    </>
  );
};

export default Drawer;
