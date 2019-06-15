import axios from "axios";
import swal from "sweetalert";

export const path = "http://192.168.9.237:8080";
// dev path
//http://localhost:8080
export default class GeneralService {
	constructor(entityPath){
		this.entityPath = entityPath;
	}

	async getById(entity) {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}/${entity.id}`)
			.then((res) => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
		return await data;
	}

	async getAll() {
		let data = null;
		let obj = this;
		await axios.get(`${path}/${this.entityPath}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
        
		return await data;
	}

	async put(entity) {
		let resp = null;
		let obj = this;
		await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => {
				resp = res.data;
				swal({
					title: "Atualizado com Sucesso",
					icon: "success",
				});
			}).catch(function (error) {
				obj.errorResponse(error);
			});
		return resp;
	}

	async post(entity) {
		let response = null;
		let obj = this;
		await axios.post(`${path}/${this.entityPath}`, entity, {
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				swal({
					title: "Cadastrado com Sucesso",
					icon: "success",
				});
				response = res.data;
			}).catch(function (error) {
				obj.errorResponse(error);
			});
		return response;
	}

	async delete(entity) {
		let obj = this;
		await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
			.then(() => {
				swal({
					title: "Deletado com Sucesso",
					icon: "success",
				});
			}).catch(function (error) {
				obj.errorResponse(error);
			});
	}
    
	errorResponse(error){
		if(undefined !== error.response.data.msg) {
			swal({
				title: error.response.data.msg,
				icon: "error",
			});
		} else if(undefined === error.response.data.errors){
			swal({
				title: error.response.data,
				icon: "error",
			});
		} else {
			let errors = "";
			error.response.data.errors.map((err) => {
				errors += err.defaultMessage;
			});
			swal({
				title: "Erro na requisição",
				text: errors,
				icon: "error",
			});
		}
	}

}

