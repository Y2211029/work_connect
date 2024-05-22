import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./App.css";
import "normalize.css"; //こちらを新たに追加//
import HorizontalLinearStepper from "./components/stepbar.jsx";
import Header from "./components/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          {/* <Routes>
            <Route path="/" element={<BlogPage />} />
          </Routes> */}
        </div>
      </Router>
      <div className="lowermostPlatform">
        <header></header>
        <main>
          <p>新規登録</p>
          <div className="test">
            <HorizontalLinearStepper />
          </div>
        </main>
        <div class="centering_parent">
          <div class="centering_item"></div>
        </div>
      </div>
    </>
  );
};

export default App;
