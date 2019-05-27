import axios from 'axios';
import swal from 'sweetalert';
import GeneralService from './GeneralService';

import { path } from './GeneralService';
// dev path
//http://localhost:8080
export default class ChangeService extends GeneralService {
    constructor(entityPath){
        super(entityPath);
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

    async aproved(change) {
        let response;
        await axios.post(`${path}/${this.entityPath}/aproved/${change.id}`)
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

    async reproved(change) {
        let response;
        await axios.post(`${path}/${this.entityPath}/reproved/${change.id}`)
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