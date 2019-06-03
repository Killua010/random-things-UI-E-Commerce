import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class CouponPromotionalService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getByName(name) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/findByName/${name}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

}