const express = require("express")
const router = express.Router()

const{
    createCoupon,
    deactivateCoupon,
    getCoupon,
    getAllCoupons,
}=require("../controllers/Coupon")

router.post("/createCoupon",createCoupon)
router.post("/deactivateCoupon",deactivateCoupon)
router.post("/getCoupon",getCoupon)
router.post("/getAllCoupons",getAllCoupons)

module.exports=router