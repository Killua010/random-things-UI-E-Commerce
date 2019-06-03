import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ProviderService extends GeneralService{
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdCategory(id) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/findByCategory/${id}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}
}