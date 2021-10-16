const express= require ("express");
const router= express.Router();
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "./public/img")
    },
    filename:function(req,file,cb){
        let newFileName= Date.now()+path.extname(file.originalname)
        cb(null,newFileName)
        }})
    
const fileUpload=multer({storage:storage});
const productController= require ("../controllers/productController.js")


///list
router.get("/", productController.list);
router.get("/buscar", productController.buscar);


//detail
router.get("/:id", productController.detail);


//create 
router.get("/create", productController.create);
router.post("/create",fileUpload.single("foto"), productController.store);

//edit
router.get("/:id/edit", productController.edit);
router.put("/:id/edit",fileUpload.single("foto"), productController.update);

// delete
router.delete("/destroy/:id", productController.destroy)








module.exports = router;
