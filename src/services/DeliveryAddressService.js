import axios from "axios";
import swal from "sweetalert";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class DeliveryAddressService extends GeneralService{
	constructor(entityPath){
		super(entityPath);
	}

	async put(idClient, entity) {
		let resp;
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
			resp = false;
			this.errorResponse(error);
		});
		return resp;
	}

	async post(idClient,entity) {
		let response;
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
			this.errorResponse(error);
		});
		return response;
	}

}

