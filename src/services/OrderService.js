import axios from "axios";

import { path } from "./GeneralService";
import SimpleService from "./SimpleService";

export default class OrderService extends SimpleService {
	constructor(entityPath){
		super(entityPath);
	}

	async getAllByClientId(id) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/byIdClient/${id}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async getAllByStatus(status) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/${status}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async nextStep(order) {
		let response;
		await axios.put(`${path}/${this.entityPath}/${order.id}/nextStep`)
			.catch(function (error) {
				response = false;
				this.errorResponse(error);
			});
		return response;
	}

}