import * as React from "react";
import "./styles.css";
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./Header";
import Routes from "./Routes";

const App = () => {
  return (
    <Router>
      <>
        <Header />

        <Routes />
      </>
    </Router>
  );
};

export default App;
