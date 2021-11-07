const express= require ("express");
const router= express.Router();

const fileUpload = require("../middlewares/productMulterMidd.js");
const validar = require ('../middlewares/validForms.js');



//router que maneja el crud de productos desde ADMIN


const adminController= require ("../controllers/adminController.js")

//list
router.get ("/", adminController.list);

//create 
router.get("/create", adminController.create);
router.post("/create",fileUpload.single("foto"),validar.productAdd, adminController.store);

//edit
router.get("/:id/edit", adminController.edit);
router.put("/:id/edit",fileUpload.single("foto"), validar.productEdit, adminController.update);

// delete
router.delete("/destroy/:id", adminController.destroy);

//detail
router.get("/detail/:id", adminController.detail);

module.exports = router;

