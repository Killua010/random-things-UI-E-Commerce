import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class GeneralService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async getAllByClientId(id) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/byIdClient/${id}`)
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

    async getAllByStatus(status) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/${status}`)
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

    async post(order) {
        let response;
        await axios.post(`${path}/${this.entityPath}`, order, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            response = res;
        }).catch(function (error, e) {
            if(undefined === error.response){
                console.log(error)
                response = false
            }
            if(undefined !== error.response.data.msg){
                swal({
                    title: error.response.data.msg,
                    icon: "error",
                });
                response = false;
            }else if(undefined === error.response.data.errors){
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

    async nextStep(order) {
        let response;
        await axios.put(`${path}/${this.entityPath}/${order.id}/nextStep`)
        .catch(function (error, e) {
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

}