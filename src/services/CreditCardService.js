import axios from "axios";
import swal from "sweetalert";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class CreditCardService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async put(idClient, entity) {
		let resp;
		let obj = this;
		await axios.put(`${path}/${this.entityPath}/client/${idClient}/${entity.id}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			resp = true;
			swal({
				title: "Atualizado com Sucesso",
				icon: "success",
			});
		}).catch(function (error) {
			obj.errorResponse(error);
		});
		return resp;
	}

	async post(idClient,entity) {
		let response;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/client/${idClient}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then(() => {
			swal({
				title: "Cadastrado com Sucesso",
				icon: "success",
			});
			response = true;
		}).catch(function (error) {
			response = false;
			obj.errorResponse(error);
		});
		return response;
	}

}

