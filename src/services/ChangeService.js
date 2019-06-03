import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ChangeService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
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

	async aproved(change) {
		let response;
		await axios.post(`${path}/${this.entityPath}/aproved/${change.id}`)
			.catch(function (error) {
				response = false;
				this.errorResponse(error);
			});
		return response;
	}

	async reproved(change) {
		let response;
		await axios.post(`${path}/${this.entityPath}/reproved/${change.id}`)
			.catch(function (error) {
				response = false;
				this.errorResponse(error);
			});
		return response;
	}
}