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
import { useDarkMode } from "hooks/useDarkMode";
import ThemeContext from "context/theme-context";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import PageLoader from "@/components/shared/PageLoader";

type MyAppProps = AppProps & { emotionCache?: EmotionCache };

const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);


const MyApp: React.FC<MyAppProps> = (props) => {
  const [dark, setDark] = useDarkMode();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  return (
    <>
      <Script src="/noflash.js" strategy="beforeInteractive" />
      <ThemeContext.Provider value={{ dark, setDark }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <CssBaseline />
            <PageLoader />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default MyApp;
