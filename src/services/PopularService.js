import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class PopularService extends GeneralService{
	constructor(entityPath){
		super(entityPath);
	}

	async getPopular() {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/popular`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}
}