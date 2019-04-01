import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class CreditCardService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async put(idClient, entity) {
        let resp;
        await axios.put(`${path}/${this.entityPath}/client/${idClient}/${entity.id}`, entity, {
            headers: {
                'Content-Type': 'application/json'
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

    async post(idClient,entity) {
        let response;
        await axios.post(`${path}/${this.entityPath}/client/${idClient}`, entity, {
            headers: {
                'Content-Type': 'application/json'
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

