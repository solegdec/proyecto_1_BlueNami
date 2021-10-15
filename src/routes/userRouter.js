const express= require ("express");
const router= express.Router();
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "./public/img/avatars")
    },
    filename:function(req,file,cb){
        let newFileName= Date.now()+path.extname(file.originalname)
        cb(null,newFileName)
        }})
    
const fileUpload=multer({storage:storage});

const userController= require ("../controllers/userController.js")


//list
router.get("/", userController.list);

//detail
router.get("/profile", userController.profile);

//create 
router.get("/create", userController.create);
router.post("/create",fileUpload.single("avatar"), userController.store);

//edit
router.get("/:id/edit", userController.edit);
router.put("/:id/edit", userController.update);

// delete
router.delete("/destroy/:id", userController.destroy)

module.exports = router;