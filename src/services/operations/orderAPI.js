import { apiConnector } from "../apiconnector";
import {api,orderEndpoints} from "../apis";
const{
    GET_ALL_ORDER,
    GET_ORDER_BY_USERID,
    UPDATE_ORDER,
    GET_ORDER_BY_ID
}=orderEndpoints;

export const getOrderByUserId=async(userId)=>{
    try{
        const response=await apiConnector("POST",GET_ORDER_BY_USERID,{userId},null,null);
        // console.log("response",response);
        return response.data.order;
    }
    catch(error){
        console.error(error);
    }
}

export const getOrderById=async(orderId)=>{
    try{
        // console.log("a",orderId);   
        const response=await apiConnector("POST",GET_ORDER_BY_ID,{orderId},null,null);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}