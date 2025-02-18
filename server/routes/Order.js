const express = require("express")
const router = express.Router()

const{
    getOrder,
    getOrderByUserId,
    updateOrder,
    getOrderById
}=require("../controllers/Order")

router.post('/getOrder',getOrder)
router.post('/getOrderByUserId',getOrderByUserId)
router.post('/updateOrder',updateOrder)
router.post('/getOrderById',getOrderById)



module.exports=router