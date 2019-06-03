import axios from "axios";
import swal from "sweetalert";
import GeneralService from "./GeneralService";
import { path } from "./GeneralService";

export default class MultiPartFileService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async put(entity) {
		let resp;
		const data = new FormData();

		for(var prop in entity) {
			if(prop == "creationDate" || prop == "lastUpdate"){
				continue;
			}

			data.append(prop, entity[prop]);  
		}
        
		await axios.put(`${path}/${this.entityPath}/${entity.id}`, data, {
			headers: {
				"content-type": "multipart/form-data" 
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

	async post(entity) {
		let response;
        
		const data = new FormData();

		for(var prop in entity) {
			if(prop == "creationDate" || prop == "lastUpdate"){
				continue;
			}
			data.append(prop, entity[prop]);  
		}

		await axios.post(`${path}/${this.entityPath}`, data, {
			headers: {
				"content-type": "multipart/form-data" 
			}
		}).then(() => {
			swal({
				title: "Cadastrado com Sucesso",
				icon: "success",
			});
			response = true;
		}).catch(function (error) {
			this.errorResponse(error);
		});
		return response;
	}
}

