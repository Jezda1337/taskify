import React from "react";
import { Typography, Stack } from "@mui/material";
import NextLink from "next/link";

const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <Stack direction="row" alignItems="center" className="cursor-pointer" component='a'>
        <Typography variant="h3" color="primary" noWrap component="div">
          T
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="hidden md:inline-block"
        >
          askify
        </Typography>
      </Stack>
    </NextLink>
  );
};

export default Logo;
