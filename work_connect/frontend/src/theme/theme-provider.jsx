import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { createTheme } from "./create-theme";

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const theme = createTheme();

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

// PropTypesの設定
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired, // childrenは必須
};