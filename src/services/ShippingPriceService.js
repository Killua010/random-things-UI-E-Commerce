import axios from 'axios';
import swal from 'sweetalert';

export const path = "http://localhost:8080";
// dev path
//http://localhost:8080
export default class ShippingPriceService {
    constructor(entityPath){
        this.entityPath = entityPath;
    }

    async getByIdClient(id, entity) {
        let data = null;
        console.log(entity)
        await axios.post(`${path}/${this.entityPath}/calculete/client/${id}`, entity )
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
}