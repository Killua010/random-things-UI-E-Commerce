/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import GeneralService from "../../services/GeneralService";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import BlockUi from "react-block-ui";
import { Loader } from "react-loaders";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";

import {
	Card, 
	Col,
	CardFooter,
	Button,
	Label,
	Input,
} from "reactstrap";

export default class PricingGroupNew extends Component {

	constructor(props) {
		super(props);
		this.service = new GeneralService("pricinggroup");

		this.state = {
			group: {},
			update: false,
			loaderType: "ball-pulse-sync",
			blocking: false
		};

		this.updateData = this.updateData.bind(this);
		this.updateDataProfit = this.updateDataProfit.bind(this);
		this.putGroup = this.putGroup.bind(this);
		this.postGroup = this.postGroup.bind(this);
		this.executeEvent = this.executeEvent.bind(this);
		this.alterBlockUI = this.alterBlockUI.bind(this);
	}

	async putGroup(group){
		this.alterBlockUI();
		await this.service.put(group);
		this.props.history.push("listar-grupo-precificacao");
		this.alterBlockUI();
	}

	async postGroup(group){
		this.alterBlockUI();
		await this.service.post(group);
		this.props.history.push("listar-grupo-precificacao");
		this.alterBlockUI();
	}

	updateData(value){
		this.setState({
			group: {
				...this.state.group,
				name: value.target.value
			}
		});
	}

	updateDataProfit(value){
		this.setState({
			group: {
				...this.state.group,
				profitPercentage: value.target.value
			}
		});
	}

	executeEvent(group){ 
		if(this.state.update === false)
			this.postGroup(group);
		else  
			this.putGroup(group);
	}

	alterBlockUI(){
		this.setState({
			blocking: !this.state.blocking
		});
	}

	componentDidMount() {
		if(this.props.location.state !== undefined){
			this.setState({
				group: this.props.location.state.group,
				update: true
			});
		} else {
			this.setState({
				group: {},
				update: false
			});
		}
	}

	render() {
		return (
			<div className="content">
				<BlockUi tag="div" blocking={this.state.blocking} loader={<Loader active type={this.state.loaderType} color="#02a17c"/>}>
					<Col xs="12">
						<h4 className="title">Dados do grupo de precificação</h4>
						<Card>
							<CustomTabs
								plainTabs
								headerColor="warning"
								tabs={[
									{
										tabName: "Dados básicos",
										tabContent: (
											<div>
												<Label for="groupName">Nome do grupo de precificação</Label>
												<Input type="text" id="groupName" name="groupName" value={this.state.group.name} onChange={this.updateData}></Input>
												<Label for="groupValue">Percentual do grupo</Label>
												<Input type="text" id="groupValue" name="groupValue" value={this.state.group.profitPercentage} onChange={this.updateDataProfit}></Input>
											</div>
										)
									}
								]}
							/>
							<CardFooter>
								<Button tag="label"
									className="btn-simple float-right"
									color="warning"
									size="md"
									onClick={() => { this.executeEvent(this.state.group); } }>
                      Salvar
								</Button>
							</CardFooter>
						</Card>
					</Col>
				</BlockUi>
			</div>
		);
	}
}

