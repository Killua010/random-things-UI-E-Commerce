import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class GeneralService {
    constructor(entityPath){
        this.entityPath = entityPath;
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
        await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            swal({
                title: "Atualizado com Sucesso",
                icon: "success",
              });
        }).catch(function (error, e) {
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
    }

    async post(entity) {
        await axios.post(`${path}/${this.entityPath}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            swal({
                title: "Cadastrado com Sucesso",
                icon: "success",
            });
        }).catch(function (error, e) {
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

