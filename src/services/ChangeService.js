import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ChangeService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getAllByStatus(status) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/${status}`,{
			headers: {
				"Authorization" : localStorage.getItem("Authorization")
			}
		}).then(res => {
			data = res.data;
		}).catch(function (error) {
			obj.errorResponse(error);
		});
        
		return await data;
	}

	async aproved(change) {
		let response;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/aproved/${change.id}`)
			.catch(function (error) {
				response = false;
				obj.errorResponse(error);
			});
		return response;
	}

	async reproved(change) {
		let response;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/reproved/${change.id}`)
			.catch(function (error) {
				response = false;
				obj.errorResponse(error);
			});
		return response;
	}
}