const express= require ("express");
const router= express.Router();
const multer=require("multer")
const path=require("path")
const fileUpload = require("../middlewares/productMulterMidd.js");


//router que maneja el crud de productos desde ADMIN


const adminController= require ("../controllers/adminController.js")

//list
router.get ("/", adminController.list);

//create 
router.get("/create", adminController.create);
router.post("/create",fileUpload.single("foto"), adminController.store);

//edit
router.get("/:id/edit", adminController.edit);
router.put("/:id/edit",fileUpload.single("foto"), adminController.update);

// delete
router.delete("/destroy/:id", adminController.destroy);

//detail
router.get("/detail/:id", adminController.detail);

module.exports = router;

