import GeneralService from "./GeneralService";
import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";

export default class ClientService extends GeneralService {
    async login(entity) {
        let resp = null;
        await axios.post(`${path}/${this.entityPath}/login`, entity, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            resp = res.data;
        })
        .catch(function (error, e) {
            if(error.response.data.msg !== undefined) {
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
}