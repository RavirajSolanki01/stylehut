import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import "./index.css";
import store, { persistor } from "./store";
import App from "./App.tsx";
import theme from "./utils/theme.ts";
import ScrollTop from "./utils/lib/scroll-top";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <ToastContainer position="top-center" />
    <CssBaseline />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ScrollTop>
            <App />
          </ScrollTop>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
