import axios from 'axios';
import swal from 'sweetalert';
import GeneralService from './GeneralService';

import { path } from './GeneralService';
// dev path
//http://localhost:8080
export default class ReportOrderService extends GeneralService {
    constructor(entityPath){
        super(entityPath);
    }

    async getAllOrders() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/orders`)
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

    
    async getAllOrdersByCategories() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/orders/categories`)
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

    async getAllOrdersByProduct() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/orders/products`)
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

    async getAllOrdersCategory() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersCategory`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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

    async getAllOrdersCategoryGender(gender, mounth) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersCategory/gender/${gender}/${mounth}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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


    async getAllOrdersCategoryGenderAge(gender, start, end, mounth) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersCategory/gender/${gender}/age/${start}/${end}/${mounth}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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

    async getAllOrdersProduct() {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersProduct`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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

    async getAllOrdersProductGender(gender, mounth) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersProduct/gender/${gender}/${mounth}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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


    async getAllOrdersProductGenderAge(gender, start, end, mounth) {
        let data = null;
        await axios.get(`${path}/${this.entityPath}/ordersProduct/gender/${gender}/age/${start}/${end}/${mounth}`)
        .then(res => {
            data = res.data;
        }).catch(function (error, e) {
            console.log(error)
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