import axios from "axios";

import { path } from "./GeneralService";
import SimpleService from "./SimpleService";

export default class ShoppingCart extends SimpleService{
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdClient(id) {
		
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/client/${id}`, {
			headers: {
				"Authorization" : localStorage.getItem("Authorization")
			}
		})
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

	async post(entity, clientId) {
		let response;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/client/${clientId}`, entity, {
			headers: {
				"Content-Type": "application/json",
				"Authorization" : localStorage.getItem("Authorization")
			}
		}).then(res => {
			response = res.data;
		}).catch(function (error) {
			response = false;	
			obj.errorResponse(error);
		});
		return response;
	}

	async delete(entity, clientId) {
		let response;
		let obj = this;
		await axios.delete(`${path}/${this.entityPath}/client/${clientId}`, { data: entity },{
			headers: {
				"Authorization" : localStorage.getItem("Authorization")
			}
		}).then(res => {
			response = res.data;
		}).catch(function (error) {
			response = false;
			obj.errorResponse(error);
		});
		return response;
	}
}

