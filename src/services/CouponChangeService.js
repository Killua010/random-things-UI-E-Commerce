import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";
// dev path
//http://localhost:8080
export default class CouponChangeService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdClientAndName(id, name) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/byIdClientAndName/${id}/${name}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

}