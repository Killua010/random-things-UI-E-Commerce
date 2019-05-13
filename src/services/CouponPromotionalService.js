import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class CouponPromotionalService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async getByName(name) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/findByName/${name}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
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

}