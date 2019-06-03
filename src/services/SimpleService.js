import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class SimpleService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getAll() {
		let data = null;
		await axios.get(`${path}/${this.entityPath}`)
			.catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async put(entity) {
		let resp = null;
		await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => resp = res.data)
			.catch(function (error) {
				this.errorResponse(error);
			});
		return resp;
	}

	async post(entity) {
		let resp = null;
		await axios.post(`${path}/${this.entityPath}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => resp = res.data)
			.catch(function (error) {
				this.errorResponse(error);
			});
		return resp;
	}

	async delete(entity) {
		await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
			.catch(function (error) {
				this.errorResponse(error);
			});
	}
}

