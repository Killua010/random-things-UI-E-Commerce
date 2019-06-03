import axios from "axios";
import swal from "sweetalert";
import GeneralService from "./GeneralService";

import { path } from "./GeneralService";

export default class ProductService extends GeneralService {
	constructor(entityPath){
		super(entityPath);
	}

	async getById(entity) {
		let data = null;
		await axios.get(`${path}/${this.entityPath}/${entity.id}`)
			.then((res) => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
		return await data;
	}

	async getPageabled(page){
		let data = null;
		await axios.get(`${path}/${this.entityPath}/paging/${page}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async findBy(param){
		let data = null;
		await axios.get(`${path}/${this.entityPath}/findBy/${param}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async findByCategory(id){
		let data = null;
		await axios.get(`${path}/${this.entityPath}/findByCategory/${id}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async getPageabledByCategory(page, category){
		let data = null;
		await axios.get(`${path}/${this.entityPath}/paging/${page}`, {
			params: {
				categoryId: category.id
			}
		}).then(res => {
			data = res.data;
		}).catch(function (error) {
			this.errorResponse(error);
		});
        
		return await data;
	}

	async getAll() {
		let data = null;
		await axios.get(`${path}/${this.entityPath}`)
			.then(res => {
				data = res.data;
			}).catch(function (error) {
				this.errorResponse(error);
			});
        
		return await data;
	}

	async put(entity) {
		let resp;
		const data = new FormData();
		data.append("barCode", entity.barCode);
		data.append("description", entity.description);
		data.append("name", entity.name);
		data.append("pricingGroupId", entity.pricingGroupId);

		for(let i = 0; i < entity.subCategoryId.length; i++){
			data.append("subCategoryId", entity.subCategoryId[i]);
		}

		for(let i = 0; i < entity.descriptionField.length; i++){
			data.append("descriptionField", entity.descriptionField[i]);
		}

		for(let i = 0; i < entity.technicalFieldId.length; i++){
			data.append("technicalFieldId", entity.technicalFieldId[i]);
		}

		for(let i = 0; i < entity.images.length; i++){
			data.append("images", entity.images[i]);
		}
        
		await axios.put(`${path}/${this.entityPath}/${entity.id}`, data, {
			headers: {
				"content-type": "multipart/form-data" 
			}
		})
			.then(() => {
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
		data.append("barCode", entity.barCode);
		data.append("description", entity.description);
		data.append("name", entity.name);
		data.append("barCode", entity.barCode);
		data.append("pricingGroupId", entity.pricingGroupId);

		for(let i = 0; i < entity.subCategoryId.length; i++){
			data.append("subCategoryId", entity.subCategoryId[i]);
		}

		for(let i = 0; i < entity.descriptionField.length; i++){
			data.append("descriptionField", entity.descriptionField[i]);
		}

		for(let i = 0; i < entity.technicalFieldId.length; i++){
			data.append("technicalFieldId", entity.technicalFieldId[i]);
		}

		for(let i = 0; i < entity.images.length; i++){
			data.append("images", entity.images[i]);
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
			response = false;
			this.errorResponse(error);
		});
		return response;
	}

	async delete(entity) {
		await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
			.then(() => {
				swal({
					title: "Deletado com Sucesso",
					icon: "success",
				});
			}).catch(function (error) {
				this.errorResponse(error);
			});
	}
}

