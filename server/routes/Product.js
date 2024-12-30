const express = require("express")
const router = express.Router()

const{
    addProduct,
    getAllProducts,
    deleteProduct,
}=require("../controllers/Product")
const{
    addComboProduct,
    getAllComboProducts,
    deleteComboProduct,
}=require('../controllers/ComboOffer')

router.post("/addProduct",addProduct)
router.get("/getAllProduct",getAllProducts)
router.delete("/deleteProduct",deleteProduct)

router.post("/addComboProduct",addComboProduct)
router.get("/getAllComboProduct",getAllComboProducts)
router.delete("/deleteComboProduct",deleteComboProduct)

module.exports = router