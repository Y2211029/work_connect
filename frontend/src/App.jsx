import { useScrollToTop } from "src/hooks/use-scroll-to-top";

import Router from "src/routes/sections";

import ThemeProvider from "src/theme/index";

import "./global.css";

// ----------------------------------------------------------------------

const App = () => {
  useScrollToTop();
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
