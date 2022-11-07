import React from "react";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { isActive } from "utils/helpers";
import { Theme, useTheme } from "@mui/material/styles";
import { drawerNavItems } from "utils/constants";
import IsActiveBar from "./IsActiveBar";

const DrawerExpandedItems = () => {
  const { asPath } = useRouter();
  const theme: Theme = useTheme();

  return (
    <>
      <Stack
        component="ul"
        p={0}
        m={0}
        className="fade-in"
        style={{ animationDelay: "100ms" }}
      >
        {drawerNavItems.map(({ label, path, exact, icon, activeIcon }) => (
          <NextLink key={path} href={path} passHref>
            <ListItem disablePadding component="a" className="relative">
              <IsActiveBar isActive={isActive(asPath, path, exact)} direction='column' />
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  style={{
                    minWidth: "unset",
                    color: theme.palette.text.primary,
                  }}
                >
                  {isActive(path, asPath, exact) ? activeIcon : icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    ml: "1.5rem",
                    fontWeight: isActive(path, asPath, exact) ? 900 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </NextLink>
        ))}
      </Stack>
      <Divider />
    </>
  );
};

export default DrawerExpandedItems;
