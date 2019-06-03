import axios from "axios";

import { path } from "./GeneralService";
import SimpleService from "./SimpleService";

export default class ShoppingCart extends SimpleService{
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdClient(id) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/client/${id}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async post(entity, clientId) {
		let response;
		await axios.post(`${path}/${this.entityPath}/client/${clientId}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			response = res.data;
		}).catch(function (error) {
			response = false;	
			this.errorResponse(error);
		});
		return response;
	}

	async delete(entity, clientId) {
		let response;
		await axios.delete(`${path}/${this.entityPath}/client/${clientId}`, { data: entity }).then(res => {
			response = res.data;
		}).catch(function (error) {
			response = false;
			this.errorResponse(error);
		});
		return response;
	}
}

