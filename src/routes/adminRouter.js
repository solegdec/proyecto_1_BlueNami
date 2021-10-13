const express= require ("express");
const router= express.Router();
const multer=require("multer")
const path=require("path")

//multer
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "./public/img/avatars")
    },
    filename:function(req,file,cb){
        let newFileName= Date.now()+path.extname(file.originalname)
        cb(null,newFileName)
        }})
    
const fileUpload=multer({storage:storage});


const adminController= require ("../controllers/adminController.js")

//list
//router.get ("/", adminController.list);

//create 
//router.get("/create", adminController.create);
//router.post("/create",fileUpload.single("foto"), adminController.store);

//edit
//router.get("/:id/edit", adminController.edit);
//router.put("/:id/edit", adminController.update);

// delete
//router.delete("/destroy/:id", adminController.destroy);

//detail
//router.get("/detail/:id", adminController.detail);

module.exports = router;

