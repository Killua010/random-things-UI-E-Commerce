import GeneralService from "./GeneralService";
import axios from "axios";

import { path } from "./GeneralService";

export default class ClientService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async login(entity) {
		let resp = null;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/login`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			resp = res.data;
		}).catch(function (error) {
			obj.errorResponse(error);
		});

		return resp;
	}

}