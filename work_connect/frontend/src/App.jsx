/* eslint-disable perfectionist/sort-imports */
// カスタムスクロールバー
import "./global.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useScrollToTop } from "./hooks/use-scroll-to-top";

import Router from "./routes/sections";

import ThemeProvider from "./theme";

// ----------------------------------------------------------------------

const App = () => {
  useScrollToTop();

  const [value, setValue] = useState([]);

  // 先ほど作成したLaravelのAPIのURL
  const url = "http://localhost:8000/list";

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url);
        setValue(res.data.post);
        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
