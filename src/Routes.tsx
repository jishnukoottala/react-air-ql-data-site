import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import Colors from "./components/Colors";
import Instructions from "./components/Instructions";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>

    <Route path="/colors">
      <Colors />
    </Route>

    <Route path="/instructions">
      <Instructions />
    </Route>
  </Switch>
);

export default Routes;
