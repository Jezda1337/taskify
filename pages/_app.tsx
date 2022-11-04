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
import Layout from "../components/shared/layout/Layout";
import { useDarkMode } from "hooks/useDarkMode";
import NavContext from "context/nav-context";
import Script from "next/script";
import PageLoader from "@/components/shared/PageLoader";
import { UserProfile } from "types/auth/user-profile.type";
import Head from "next/head";
import { useRouteLoading } from "hooks/useRouteLoading";
import LinearProgress from "@mui/material/LinearProgress";

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
  pageProps: { user?: UserProfile };
};

const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FC<MyAppProps> = (props) => {
  const [dark, setDark] = useDarkMode(null);
  const isRouteLoading = useRouteLoading();
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { user, ...otherProps },
  } = props;

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Taskify</title>
      </Head>
      <Script src="/noflash.js" strategy="beforeInteractive" />
      <NavContext.Provider value={{ dark, setDark, user }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <CssBaseline />
            <PageLoader />
            {isRouteLoading ? (
              <LinearProgress className="fixed top-0 left-0 right-0 z-[1000]" />
            ) : null}
            <Layout>
              <Component {...otherProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </NavContext.Provider>
    </>
  );
};

export default MyApp;
