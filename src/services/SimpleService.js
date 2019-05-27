import axios from 'axios';
import swal from 'sweetalert';
import GeneralService from './GeneralService';

import { path } from './GeneralService';
// dev path
//http://localhost:8080
export default class SimpleService extends GeneralService {
    constructor(entityPath){
        super(entityPath);
    }

    async getAll() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}`)
        .catch(function (error, e) {
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
                    errors += err.defaultMessage
                })
                swal({
                    title: "Erro na requisição",
                    text: errors,
                    icon: "error",
                });
            }
        })
        
        return await data;
    }

    async put(entity) {
        let resp = null;
        await axios.put(`${path}/${this.entityPath}/${entity.id}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => resp = res.data)
        .catch(function (error, e) {
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
        let resp = null;
        await axios.post(`${path}/${this.entityPath}`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => resp = res.data)
        .catch(function (error, e) {
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

    async delete(entity) {
        await axios.delete(`${path}/${this.entityPath}/${entity.id}`)
        .catch(function (error, e) {
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
}

