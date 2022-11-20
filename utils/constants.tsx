import HouseIcon from "@mui/icons-material/House";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import Groups3Icon from "@mui/icons-material/Groups3";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

export const EMAIL_REGEX = /^\w+([.-]?\w+)+@\w+([.:]?\w+)+(\.[a-zA-Z0-9]{2,})+$/;

export const drawerNavItems = [
  {
    label: "Home",
    path: "/",
    exact: true,
    icon: <HouseOutlinedIcon />,
    activeIcon: <HouseIcon />,
  },
  {
    label: "Projects",
    path: "/projects",
    exact: false,
    icon: <AssignmentTurnedInOutlinedIcon />,
    activeIcon: <AssignmentTurnedInIcon />,
  },
  {
    label: "People",
    path: "/people",
    exact: false,
    icon: <Groups3OutlinedIcon />,
    activeIcon: <Groups3Icon />,
  },
  {
    label: "Settings",
    path: "/settings",
    exact: false,
    icon: <SettingsSuggestOutlinedIcon />,
    activeIcon: <SettingsSuggestIcon />,
  },
];

export const openDrawerWidth = 240;
export const closedDrawerWidth = 64;