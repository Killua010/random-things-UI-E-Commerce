import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ProviderService extends GeneralService{
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdCategory(id) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/findByCategory/${id}`,{
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
}