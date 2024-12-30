const express = require("express")
const router = express.Router()

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  placeOrder,
} = require("../controllers/Payments")

const { auth} = require("../middlewares/auth")

router.post("/placeOrder", auth, placeOrder)
router.post("/capturePayment", auth, capturePayment)
router.post("/verifyPayment", auth, verifyPayment)
router.post("/sendPaymentSuccessEmail",auth,sendPaymentSuccessEmail)
// router.post("/verifySignature", verifySignature)

module.exports = router
