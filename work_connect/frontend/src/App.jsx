import { useScrollToTop } from "src/hooks/use-scroll-to-top";

import Router from "src/routes/sections";

import ThemeProvider from "src/theme/index";

import "./global.css";

// ----------------------------------------------------------------------

const App = () => {
  useScrollToTop();
  const arrayLike = {
    unrelated: "foo",
    length: 3,
    2: 4,
    
  };
  Array.prototype.push.call(arrayLike, 1, 50);
  console.log(arrayLike);
  // { '2': 4, '3': 1, '4': 2, length: 5, unrelated: 'foo' }

  const plainObj = {};
  // length プロパティがないので、長さは 0
  Array.prototype.push.call(plainObj, 1, 2);
  // console.log(plainObj);
  // { '0': 1, '1': 2, length: 2 }

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
