import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Search from "./pages/Search";
import Top from "./pages/Top";
import Watch from "./pages/Watch";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Top} />
        <Route path='/search' component={Search} />
        <Route path='/watch' component={Watch} />
      </Switch>
    </Router>
  );
};
