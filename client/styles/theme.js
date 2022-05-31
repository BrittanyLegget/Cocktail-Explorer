import { createTheme, responsiveFontSizes, styled } from "@mui/material/styles";

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
    title: {
      fontWeight: "bold",
      fontSize: 50,
      textAlign: "center",
      paddingTop: 20,
      paddingBottom: 20,
    },
    subTitle: {
      fontSize: 30,
      textAlign: "center",
      paddingTop: 100,
    },
    fontFamily: ["Poppins"].join(","),
    fontSize: 14,
  },
  button: {
    styledButton: {
      margin: "auto",
      display: "block",

      ":hover": {
        color: "black",
        borderColor: "white",
        backgroundColor: "#cfd8dc",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
