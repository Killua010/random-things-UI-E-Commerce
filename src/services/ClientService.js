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
		await axios.post(`${path}/login`, entity)
			.then(res => {
				resp = res.headers.authorization;
				localStorage.setItem("Authorization", resp);
			}).catch(function (error) {
				obj.errorResponse(error);
			});

		if(resp != null){
			resp = await this.getUser(entity, resp);
		}

		return resp;
	}

	async getUser(entity,resp){
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/login`, entity).then(res => {
			resp = {
				...res.data
			};
		}).catch(function (error) {
			obj.errorResponse(error);
		});
		return resp;
	}

}