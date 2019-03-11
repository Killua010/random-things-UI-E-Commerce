import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "views/admin/AdminLayout.jsx";
import ClientLayout from "views/client/ClientLayout.jsx";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/perfil" render={props => <ClientLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/mesas" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
