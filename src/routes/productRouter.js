const express= require ("express");
const router= express.Router();

const productController= require ("../controllers/productController.js")


//list
router.get("/", productController.list);

//detail
router.get("/:id", productController.detail);

//create 
router.get("/create", productController.create);
router.post("/create", productController.store);

//edit
router.get("/:id/edit", productController.edit);
router.put("/:id/edit", productController.update);

// delete
router.delete("/:id/delete", productController.destroy);


module.exports = router;