import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import createEmotionCache from "../utility/createEmotionCache";
import darkThemeOptions from "../styles/theme/darkThemeOptions";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/global.scss";

type MyAppProps = AppProps & { emotionCache?: EmotionCache };

const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FC<MyAppProps> = (props) => {
  const [isDark, setIsDark] = React.useState(false);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
