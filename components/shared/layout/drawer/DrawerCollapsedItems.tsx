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

type Props = {
  direction: "row" | "column";
};

const DrawerCollapsedItems = ({ direction }: Props) => {
  const { asPath: currentUrl } = useRouter();
  const theme: Theme = useTheme();

  return (
    <>
      <Stack
        direction={direction}
        component="ul"
        p={0}
        m={0}
        className="fade-in"
      >
        {drawerNavItems.map(({ label, path, exact, icon, activeIcon }) => (
          <NextLink key={path} href={path} passHref>
            <ListItem disablePadding component="a" className="relative">
              <IsActiveBar
                isActive={isActive(path, currentUrl, exact)}
                direction={direction}
              />
              <ListItemButton className="min-h-[63px] px-5 flex-col justify-center items-center">
                <ListItemIcon className="min-w-[unset]">
                  {isActive(path, currentUrl, exact) ? activeIcon : icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: ".6rem",
                    fontWeight: isActive(path, currentUrl, exact) ? 900 : 400,
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

export default DrawerCollapsedItems;
