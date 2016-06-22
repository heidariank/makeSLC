import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
import Details from "./pages/Details";
import Admin from "./pages/Admin";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="settings" name="settings" component={Settings}></Route>
      <Route path="admin" name="admin" component={Admin}></Route>
      <Route name="details" path="details/:title" component={Details}></Route>
    </Route>
  </Router>,
app);

// handler={require('./components/Maker.js')}