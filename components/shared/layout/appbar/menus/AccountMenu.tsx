import React, { useContext } from "react";
import NavContext, { NavContextType } from "context/nav-context";
import { IconButton, Stack } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useRouter } from "next/router";
import { axiosClient } from "middleware/axios";

const AccountMenu = () => {
  const { dark, setDark, user } = useContext(NavContext) as NavContextType;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const logout = async () => {
    handleClose();
    await axiosClient("/auth/logout");
    router.replace("/auth/login");
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="account menu"
          onClick={handleOpen}
          size="medium"
          className="m-0"
        >
          {open ? <PersonIcon /> : <PermIdentityIcon />}
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={2}
        disableScrollLock
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: 300,
          },
        }}
      >
        <Stack direction="column" spacing={2} p={2}>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt="Profile" src={user?.avatar ? user?.avatar : ""} />{" "}
            <strong>{user?.fullname}</strong>
          </Stack>

          <Divider />

          <MenuItem disableGutters onClick={() => setDark(!dark)}>
            <ListItemIcon>
              {dark ? <Brightness2Icon /> : <WbSunnyIcon />}
            </ListItemIcon>
            Appearance: {dark ? "Dark" : "Light"}
          </MenuItem>

          <MenuItem disableGutters onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Sign out
          </MenuItem>

        </Stack>
      </Menu>
    </>
  );
};

export default AccountMenu;
