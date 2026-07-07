import React from "react";
import LandingPage from "./suby/pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductMenu from "./suby/components/productMenu";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:firmId/:firmName" element={<ProductMenu />} />
      </Routes>
    </div>
  );
};

export default App;
