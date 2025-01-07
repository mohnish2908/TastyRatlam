const express = require("express")
const router = express.Router()

const{
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
}=require("../controllers/Product")
const{
    addComboProduct,
    getAllComboProducts,
    deleteComboProduct,
    getComboProductById,
}=require('../controllers/ComboOffer')

router.post("/addProduct",addProduct)
router.get("/getAllProduct",getAllProducts)
router.delete("/deleteProduct",deleteProduct)
router.get("/getProductById/:id",getProductById)

router.post("/addComboProduct",addComboProduct)
router.get("/getAllComboProduct",getAllComboProducts)
router.delete("/deleteComboProduct",deleteComboProduct)
router.get("/getComboProductById/:id",getComboProductById)

module.exports = router