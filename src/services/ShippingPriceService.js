import axios from "axios";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ShippingPriceService extends GeneralService{
	constructor(entityPath){
		super(entityPath);
	}

	async getByIdClient(id, entity) {
		let data = null;
		await axios.post(`${path}/${this.entityPath}/calculete/client/${id}`, entity )
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}
}