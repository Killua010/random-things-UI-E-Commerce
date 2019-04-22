import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class ShoppingCart {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async getById(id) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/${id}`)
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

    async getByIdClient(id) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/client/${id}`)
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
        await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            resp = res.data;
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

    async post(entity, clientId) {
        let response;
        await axios.post(`${path}/${this.entityPath}/client/${clientId}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            response = res.data;
        })
        .catch(function (error, e) {
            if(undefined === error.response){
                console.log(error)
                response = false
            }
            if(undefined === error.response.data.errors){
                swal({
                    title: error.response.data.msg,
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

    async delete(entity, clientId) {
        let response;
        console.log(entity)
        await axios.delete(`${path}/${this.entityPath}/client/${clientId}`, { data: entity }).then(res => {
            response = res.data;
        })
        .catch(function (error, e) {
            if(undefined === error.response){
                response = false
            }
            if(undefined === error.response.data.errors){
                swal({
                    title: error.response.data.msg,
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
}

