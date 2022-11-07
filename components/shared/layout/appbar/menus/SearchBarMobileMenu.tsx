import React from "react";
import { IconButton , Box} from "@mui/material";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBarMobileMenu = () => {
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
      <Tooltip title="Account settings">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Search menu"
          // onClick={handleOpen}
          size="medium"
          className="m-0 inline-flex md:hidden"
        >
          <SearchOutlinedIcon />
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
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: 300,
          },
        }}
      >
        <Box p={2}></Box>
      </Menu>
    </>
  );
};

export default SearchBarMobileMenu;
