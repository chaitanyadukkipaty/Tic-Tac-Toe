import React from "react";
import "./App.css";
import { ToastContainer, Zoom } from "react-toastify";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ToastContainer
        autoClose={5000}
        transition={Zoom}
        limit={3}
        newestOnTop
        hideProgressBar
      />
      {pathname}
    </>
  );
}

export default App;
