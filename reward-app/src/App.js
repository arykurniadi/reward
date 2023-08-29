import React, { Component } from "react";
import "./App.scss";
import withClearCache from "./ClearCache";
import { ThemeProvider } from "react-bootstrap";

import { Outlet, useLocation } from "react-router-dom";

const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent />;
}

const RenderContent = () => {
  return (
    <ThemeProvider breakpoints={["xs", "sm", "md"]}>
      <>
        <Outlet context={[]} />
      </>
    </ThemeProvider>
  );
};

function MainApp() {
  const location = useLocation();
  const pathname = location.pathname;
  // const isHome = pathname === "/home";

  return (
    <>
      <RenderContent />
    </>
  );
}

export default App;
