import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class GeneralService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async post(order) {
        let response;
        await axios.post(`${path}/${this.entityPath}`, order, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
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

}