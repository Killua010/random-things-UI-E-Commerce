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
		let obj = this;
		await axios.put(`${path}/${this.entityPath}/client/${idClient}/${entity.id}`, entity, {
			headers: {
				"Content-Type": "application/json",
				"Authorization" : localStorage.getItem("Authorization")
			}
		}).then(() => {
			resp = true;
			swal({
				title: "Atualizado com Sucesso",
				icon: "success",
			});
		}).catch(function (error) {
			resp = false;
			obj.errorResponse(error);
		});
		return resp;
	}

	async post(idClient,entity) {
		let response;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}/client/${idClient}`, entity, {
			headers: {
				"Content-Type": "application/json",
				"Authorization" : localStorage.getItem("Authorization")
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

