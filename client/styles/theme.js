import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber, red } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: "#ff7539",
    },
    background: {
      default: "#fff",
    },
  },

  typography: {
    fontFamily: ["Poppins"].join(","),
    fontSize: 14,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
