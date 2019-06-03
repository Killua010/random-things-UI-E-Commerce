/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import AdminLayout from "views/admin/AdminLayout.jsx";
import ClientLayout from "views/client/ClientLayout.jsx";
import MainLayout from "views/main/MainLayout.jsx";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import store from "./store";

const hist = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={hist}>
			<Switch>
				<Route path="/admin" render={props => <AdminLayout {...props} />} />
				<Route path="/perfil" render={props => <ClientLayout {...props} />} />
				<Route path="/" render={props => <MainLayout {...props} />} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
