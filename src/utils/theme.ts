import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      dark: "#3D3E3E",
      light: "#727374",
    },
    secondary: {
      main: "#ffffff",
      dark: "#F2F2F2",
      light: "#E8E8E8",
      contrastText: "#D7D7D7",
    },
    error: {
      main: "#d32f2f",
    },
    // background: {
    //   default: "#f4f4f4",
    //   paper: "#ffffff",
    // },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: `'Assistant', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    h4: {
      fontSize: "30px",
      fontWeight: 500,
      lineHeight: "42px",
    },
    h6: {
      fontSize: "26px",
      fontWeight: 500,
      lineHeight: "36px",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },
    body2: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    subtitle1: {
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: 400,
    },
  },
});

export default theme;
