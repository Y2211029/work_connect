import { useScrollToTop } from "src/hooks/use-scroll-to-top";

import { useLocation } from "react-router-dom";

import Router from "src/routes/sections";

import ThemeProvider from "src/theme/index";

import "./global.css";

import "src/App.css";
import { useEffect } from "react";
// ----------------------------------------------------------------------

const BackgroundManager = () => {
  const location = useLocation();

  useEffect(() => {
    const setBackgroundImage = () => {
      if (location.pathname === "/Top") {
        const isMobile = window.matchMedia("(max-width: 1200px)").matches;
        document.body.style.backgroundImage = isMobile ? "url('/assets/background/topImagePhone.svg')" : "url('/assets/background/topImage.svg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
      } else {
        document.body.style.backgroundImage = "";
      }
    };
    // 初期設定
    setBackgroundImage();

    // 画面サイズが変更された場合のリスナーを設定
    const mediaQuery = window.matchMedia("(max-width: 1200px)");
    mediaQuery.addEventListener("change", setBackgroundImage);

    return () => {
      // アンマウント時に背景をリセット
      document.body.style.backgroundImage = "";
      mediaQuery.removeEventListener("change", setBackgroundImage);
    };
  }, [location]);

  return null; // 何も描画しない
};

const App = () => {
  useScrollToTop();
  return (
    <>
      {/* 背景管理 */}
      <BackgroundManager />
      {/* ルート設定 */}
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
