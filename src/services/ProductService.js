import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class ProductService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async getPageabled(page){
        let data = null;
        await axios.get(`${path}/${this.entityPath}/paging/${page}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            swal({
                title: error,
                icon: "error",
            });
        })
        
        return await data;
    }

    async getAll() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            swal({
                title: error,
                icon: "error",
            });
        })
        
        return await data;
    }

    async put(entity) {
        let resp;
        const data = new FormData();
    
        data.append("barCode", entity.barCode);
        data.append("description", entity.description);
        data.append("name", entity.name)
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
        
        await axios.put(`${path}/${this.entityPath}/${entity.id}`, data, {
            headers: {
                'content-type': 'multipart/form-data' 
            }
        })
        .then(() => {
            resp = true;
            swal({
                title: "Atualizado com Sucesso",
                icon: "success",
              });
        }).catch(function (error, e) {
            resp = false;
            if(undefined === error.response.data.errors){
                swal({
                    title: error.response.data,
                    icon: "error",
                });
            } else {
                let errors = "";
                error.response.data.errors.map((err) => {
                    errors += err.defaultMessage
                })
                swal({
                    title: "Erro na requisição",
                    text: errors,
                    icon: "error",
                });
            }
        })
        return resp;
    }

    async post(entity) {
        let response;
        const data = new FormData();
        data.append("barCode", entity.barCode);
        data.append("description", entity.description);
        data.append("name", entity.name)
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
                'content-type': 'multipart/form-data' 
            }
        })
        .then(res => {
            swal({
                title: "Cadastrado com Sucesso",
                icon: "success",
            });
            response = true;
        }).catch(function (error, e) {
            if(undefined === error.response){
                console.log(error)
                response = false
            }
            if(undefined === error.response.data.errors){
                swal({
                    title: error.response.data,
                    icon: "error",
                });
                response = false;
            } else {
                let errors = "";
                error.response.data.errors.map((err) => {
                    errors += err.defaultMessage
                })
                swal({
                    title: "Erro na requisição",
                    text: errors,
                    icon: "error",
                });
                response = false;
            }
        })
        return response;
    }

    async delete(entity) {
        await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
        .then(() => {
            swal({
                title: "Deletado com Sucesso",
                icon: "success",
            });
        }).catch(function (error, e) {
            swal({
                title: error.response.data,
                icon: "error",
            });
        })
    }
}

