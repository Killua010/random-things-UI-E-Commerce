/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import { clientRoutes } from "routes.js";

import logo from "assets/img/apple-icon.png";

import { connect } from "react-redux";

var ps;

class ClientLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: "orange",
			sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
			dashboardName: "Meu Perfil"
		};
		document.body.classList.add("white-content");

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.getRoutes = this.getRoutes.bind(this);
		this.handleBgClick = this.handleBgClick.bind(this);
		this.getBrandText = this.getBrandText.bind(this);

	}
	componentDidMount() {
		if(this.props.client === null){
			this.props.history.push("/login");
		} 

		if (navigator.platform.indexOf("Win") > -1) {
			document.documentElement.className += " perfect-scrollbar-on";
			document.documentElement.classList.remove("perfect-scrollbar-off");
			ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
			let tables = document.querySelectorAll(".table-responsive");
			for (let i = 0; i < tables.length; i++) {
				ps = new PerfectScrollbar(tables[i]);
			}
		}
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.documentElement.className += " perfect-scrollbar-off";
			document.documentElement.classList.remove("perfect-scrollbar-on");
		}
	}
	componentDidUpdate(e) {
		if (e.history.action === "PUSH") {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}
	// this function opens and closes the sidebar on small devices
	toggleSidebar() {
		document.documentElement.classList.toggle("nav-open");
		this.setState({ sidebarOpened: !this.state.sidebarOpened });
	}
  
	getRoutes(routes) {
		return routes.map((prop, key) => {
			if (prop.layout === "/perfil") {
				if(Array.isArray(prop.path)){
					return (
						<Route
							path={prop.layout + prop.path[key]}
							component={prop.component[key]}
							key={key}
						/>
					);
				} else {
					return (
						<Route
							path={prop.layout + prop.path}
							component={prop.component}
							key={key}
						/>
					);
				}
			} else {
				return null;
			}
		});
	}
  
	handleBgClick(color) {
		this.setState({ backgroundColor: color });
	}
  
	getBrandText() {
		for (let i = 0; i < clientRoutes.length; i++) {
			if (
				this.props.location.pathname.indexOf(
					clientRoutes[i].layout + clientRoutes[i].path
				) !== -1
			) {
				return clientRoutes[i].name;
			}
		}
		return this.state.dashboardName;
	}
  
	render() {
		return (
			<div className="wrapper">
				<Sidebar
					{...this.props}
					routes={clientRoutes}
					bgColor={this.state.backgroundColor}
					logo={{
						outterLink: "/",
						text: "Random Things",
						imgSrc: logo
					}}
					toggleSidebar={this.toggleSidebar}
				/>
				<div
					className="main-panel"
					ref="mainPanel"
					data={this.state.backgroundColor}
				>
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
						toggleSidebar={this.toggleSidebar}
						sidebarOpened={this.state.sidebarOpened}
					/>
					<Switch>{this.getRoutes(clientRoutes)}</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});


export default connect(mapStateToProps)(ClientLayout);
