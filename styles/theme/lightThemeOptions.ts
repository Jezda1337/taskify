import { amber } from "@mui/material/colors";
import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions  = {
  palette: {
    mode: 'light',
    primary: amber,
    background: {
      default: "#FFFFFF",
      paper: "#f5f5f5",
    },
  },
  zIndex:{
    drawer: 40
  }
};

export default lightThemeOptions;