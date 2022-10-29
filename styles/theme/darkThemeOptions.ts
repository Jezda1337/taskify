import { amber } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: amber,
    background: {
      default: "#000000",
      paper: "#121212",
    }
  },
};

export default darkThemeOptions;
