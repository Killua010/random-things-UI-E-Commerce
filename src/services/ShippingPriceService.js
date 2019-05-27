import axios from 'axios';
import swal from 'sweetalert';
import GeneralService from './GeneralService';

import { path } from './GeneralService';

// dev path
//http://localhost:8080
export default class ShippingPriceService extends GeneralService{
    constructor(entityPath){
        super(entityPath);
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