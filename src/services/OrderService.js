import axios from "axios";

import { path } from "./GeneralService";
import SimpleService from "./SimpleService";

export default class OrderService extends SimpleService {
	constructor(entityPath){
		super(entityPath);
	}

	async getAllByClientId(id) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/byIdClient/${id}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

	async getAllByStatus(status) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/${status}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

	async nextStep(order) {
		let response;
		let obj = this;
		await axios.put(`${path}/${this.entityPath}/${order.id}/nextStep`)
			.catch(function (error) {
				response = false;
				obj.errorResponse(error);
			});
		return response;
	}

}