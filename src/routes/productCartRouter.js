const express= require ("express");
const router= express.Router();

const productCartController= require ("../controllers/productCartController.js")

router.get ("/", productCartController.entrarCarrito);

module.exports = router;
