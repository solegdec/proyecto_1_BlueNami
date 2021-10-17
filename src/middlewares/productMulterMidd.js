const multer = require("multer");
const path = require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "./public/img")
    },
    filename:function(req,file,cb){
        let newFileName= Date.now()+path.extname(file.originalname)
        cb(null,newFileName)
        }})
    
const fileUpload=multer({storage:storage})

module.exports= fileUpload