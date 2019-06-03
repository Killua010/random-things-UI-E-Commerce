import GeneralService from "./GeneralService";
import axios from "axios";

import { path } from "./GeneralService";

export default class ClientService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async login(entity) {
		let resp = null;
		await axios.post(`${path}/${this.entityPath}/login`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			resp = res.data;
		}).catch(function (error) {
			this.errorResponse(error);
		});

		return resp;

	}

}