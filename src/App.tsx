import React from "react";
import "./App.css";
import RoutesInfo from "./components/routesInfo";
import Nav from "./components/nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <RoutesInfo />
      </BrowserRouter>
    </div>
  );
}

export default App;
