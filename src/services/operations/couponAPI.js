import { apiConnector } from "../apiconnector";
import { couponEndpoints, endpoints } from "../apis";
import { toast } from "react-hot-toast";

// const { ADD_COUPON, GET_COUPON, DEACTIVATE_COUPON, GET_ALL_COUPONS } = couponEndpoints;
const{
    ADD_COUPON,
    GET_COUPON,
    DEACTIVATE_COUPON,
    GET_ALL_COUPONS
}=couponEndpoints;


export const addCoupon = async (newCoupon) => {
    try {
        // toast.loading("Adding Coupon...");
        console.log("link",ADD_COUPON)
        const response = await apiConnector("POST", ADD_COUPON, newCoupon, null, null);
        // console.log("code, discountPercentage, condition, description", code, discountPercentage, condition, description);
        // const response = await apiConnector("POST", ADD_COUPON,{ code, discountPercentage, condition, description },null,null);
        // toast.dismiss();
        toast.success("Coupon added successfully");
        return response;
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.error); 
    } 
}

export const getAllCoupon=async()=>{
    try {
        // toast.loading("Fetching Coupons...");
        // console.log()
        const response = await apiConnector("POST", GET_ALL_COUPONS,null,null,null);
        console.log("response get all coupon",response)
        // toast.dismiss();
        return response;
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.error); 
    } 
}

export const action=async (id)=>{
    try{
        console.log("id apoi",id)
        const response=await apiConnector("POST",DEACTIVATE_COUPON,{id},null,null);
        console.log("response",response)
        return response;
    }
    catch(error){
        toast.error(error.response.data.error);
    }
}

export const getCoupon=async(code)=>{
    try{
        const response=await apiConnector("POST",GET_COUPON,{code},null,null);
        console.log("response",response)
        return response;
    }
    catch(error){
        toast.error(error.response.data.error);
    }
}