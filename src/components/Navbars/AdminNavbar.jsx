/* eslint-disable no-unused-vars */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
	Collapse,
	DropdownItem,
	UncontrolledDropdown,
	Input,
	NavbarBrand,
	Navbar,
	NavLink,
	Nav,
	Container,
	Modal
} from "reactstrap";

class AdminNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent"
		};

		this.updateColor = this.updateColor.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.toggleModalSearch = this.toggleModalSearch.bind(this);

	}
	componentDidMount() {
		window.addEventListener("resize", this.updateColor);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateColor);
	}
	// function that adds color white/transparent to the navbar on resize (this is for the collapse)
	updateColor() {
		if (window.innerWidth < 993 && this.state.collapseOpen) {
			this.setState({
				color: "bg-white"
			});
		} else {
			this.setState({
				color: "navbar-transparent"
			});
		}
	}
	// this function opens and closes the collapse on small devices
	toggleCollapse() {
		if (this.state.collapseOpen) {
			this.setState({
				color: "navbar-transparent"
			});
		} else {
			this.setState({
				color: "bg-white"
			});
		}
		this.setState({
			collapseOpen: !this.state.collapseOpen
		});
	}
	// this function is to open the Search modal
	toggleModalSearch() {
		this.setState({
			modalSearch: !this.state.modalSearch
		});
	}
	render() {
		return (
			<div>
				<Navbar
					className={classNames("navbar-absolute")}
					expand="lg"
				>
					<Container fluid>
						<div className="navbar-wrapper">
							<div
								className={classNames("navbar-toggle d-inline", {
									toggled: this.props.sidebarOpened
								})}
							>
								<button
									className="navbar-toggler"
									type="button"
									onClick={this.props.toggleSidebar}
								>
									<span className="navbar-toggler-bar bar1" />
									<span className="navbar-toggler-bar bar2" />
									<span className="navbar-toggler-bar bar3" />
								</button>
							</div>              
							<NavbarBrand href="#" className="mt-05px" onClick={e => e.preventDefault()}>
								{this.props.brandText}
							</NavbarBrand>
						</div>
						<button
							aria-expanded={false}
							aria-label="Toggle navigation"
							className="navbar-toggler"
							data-target="#navigation"
							data-toggle="collapse"
							id="navigation"
							type="button"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
						</button>
						<Collapse navbar isOpen={this.state.collapseOpen}>
							<Nav className="ml-auto" navbar>
								<UncontrolledDropdown nav>
									<NavLink>
										<DropdownItem className="nav-item">Sair</DropdownItem>
									</NavLink>
								</UncontrolledDropdown> 
								<li className="separator d-lg-none" />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
				<Modal
					modalClassName="modal-search"
					isOpen={this.state.modalSearch}
					toggle={this.toggleModalSearch}
				>
					<div className="modal-header">
						<Input id="inlineFormInputGroup" placeholder="Buscar..." type="text" />
						<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={this.toggleModalSearch}
						>
							<i className="tim-icons icon-simple-remove" />
						</button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default AdminNavbar;
