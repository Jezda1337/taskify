import React from "react";
import { Box, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import Tooltip from '@mui/material/Tooltip';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="account menu"
          onClick={handleOpen}
          size="medium"
          className="m-0"
        >
          {open ? <NotificationsIcon /> : <NotificationsNoneIcon />}
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
        <Box p={2}>This is notification menu</Box>
      </Menu>
    </>
  );
};

export default NotificationMenu;
