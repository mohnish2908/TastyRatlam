// const { default: products } = require("razorpay/dist/types/products")
const Order=require("../models/Order")  

exports.getOrder=async(req,res)=>{
    try{
        const order=await Order.find({}).populate('products.poduct')
        return res.status(200).json({order})
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

exports.getOrderById=async(req,res)=>{
    try{
        // console.log("get order by id ID",req.body)
        const {orderId}=req.body;   
        const order=await Order.findById(orderId).populate('products.product').populate('coupon')
        return res.status(200).json({order})
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

exports.getOrderByUserId=async(req,res)=>{
    try{
        const {userId}=req.body;
        // console.log("userId",userId)
        const order=await Order.find({user:userId}).populate('products.product').sort({createdAt:-1})
        // console.log("order",order)
        return res.status(200).json({order})
    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}

exports.updateOrder=async(req,res)=>{
    try{

    }
    catch(error){
        return res.status(500).json({msg:error.message})
    }
}