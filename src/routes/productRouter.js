const express= require ("express");
const router= express.Router();

const productController= require ("../controllers/productController.js")


///list
router.get("/", productController.list);

//detail
router.get("/:id", productController.detail);









module.exports = router;