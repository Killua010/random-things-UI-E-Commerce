import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class SimpleService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getAll() {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}`)
			.catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

	async put(entity) {
		let resp = null;
		let obj = this;
		await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => resp = res.data)
			.catch(function (error) {
				obj.errorResponse(error);
			});
		return resp;
	}

	async post(entity) {
		let resp = null;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => resp = res.data)
			.catch(function (error) {
				obj.errorResponse(error);
			});
		return resp;
	}

	async delete(entity) {
		let obj = this;
		await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
			.catch(function (error) {
				obj.errorResponse(error);
			});
	}
}

