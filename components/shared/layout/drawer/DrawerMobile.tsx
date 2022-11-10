import React, { useCallback, useEffect, useState } from "react";
import MuiDrawer, { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import DrawerCollapsedItems from "./DrawerCollapsedItems";

interface DrawerProps extends MuiDrawerProps {
  hide?: boolean;
}

const drawerHeight = 64;

const showMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const hideMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "hide",
})<DrawerProps>(({ theme, hide }) => ({
  "& .MuiDrawer-paper": {
    width: "100vw",
    height: drawerHeight,
    transform: hide ? `translateY(100%)` : "translateY(0)",
    ...(hide ? { ...hideMixin(theme) } : { ...showMixin(theme) }),
    overflow: "hidden",
  },
}));

const DrawerMobile = () => {
  const [hide, setHide] = useState(false);
  const [y, setY] = useState(0);

  const handleScroll = useCallback(
    (e: Event) => {
      if (y > window.scrollY) {
        setHide(false);
      } else if (y < window.scrollY) {
        setHide(true);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    () => window.removeEventListener("scroll", handleScroll);
  }, [y]);

  return (
    <StyledDrawer
      hide={hide}
      variant="permanent"
      anchor="bottom"
    >
      <DrawerCollapsedItems direction="row" />
    </StyledDrawer>
  );
};

export default DrawerMobile;
