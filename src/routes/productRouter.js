const express= require ("express");
const router= express.Router();

const productController= require ("../controllers/productController.js")

router.get ("/", productController.entrarProduct);

module.exports = router;