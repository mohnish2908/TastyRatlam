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
const{
    createRating,
    getAllRatingReview,
}=require('../controllers/RatingAndReview')
 
router.post("/addProduct",addProduct)
router.get("/getAllProduct",getAllProducts)
router.post("/deleteProduct",deleteProduct)
router.get("/getProductById/:id",getProductById)

router.post("/addComboProduct",addComboProduct)
router.get("/getAllComboProduct",getAllComboProducts)
router.post("/deleteComboProduct",deleteComboProduct)
router.get("/getComboProductById/:id",getComboProductById)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", createRating)
router.get("/getReviews", getAllRatingReview)


module.exports = router