const express= require ("express");
const router= express.Router();

const productController= require ("../controllers/productController.js")


//list
router.get("/", productController.list);

//detail
router.get("/:id", productController.detail);

//create 
router.get("/product/create", productController.create);
router.post("/product", productController.store);

//edit
router.get("/:id/edit", productController.edit);
router.put("/:id/edit", productController.update);

// delete
router.delete("/delete/:id", productController.destroy);


module.exports = router;