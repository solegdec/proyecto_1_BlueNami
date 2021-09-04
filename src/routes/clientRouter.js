const express= require ("express");
const router= express.Router();
const multer=require("multer");
const path=require("path")

const {check}=require("express-validator")

const clientController= require ("../controllers/clientController.js")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../../public/img/avatars")
    },

    filename:(req,file,cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
      cb(null,fileName)  
    },
})
const uploadFile=multer({storage})



const validations=[
    check("nombre").notEmpty().withMessage("Tienes que completar este campo"),
    check("apellido").notEmpty().withMessage("Tienes que completar este campo"),
    check("nacimiento").notEmpty().withMessage("Tienes que completar este campo"),
    check("email")
    .notEmpty().withMessage("Tienes que completar este campo")
    .isEmail().withMessage("Tienes que completar con un email"),
    check("pais").notEmpty().withMessage("Tienes que completar este campo"),
    check("telefono").notEmpty().withMessage("Tienes que completar este campo"),
    check("contraseña").notEmpty().withMessage("Tienes que completar este campo"),
    check("avatar").custom((value,{req})=>{
        let file=req.file;
        if (!file){
            throw new Error ("Tienes que subir una imagen");
        }
        return true;
    }
    )
]


router.get ("/register", clientController.registerForm)

router.post("/register", uploadFile.single("avatar"),validations,clientController.store)

router.get('/profile/:id', clientController.profile);

router.get ("/login", clientController.login);

router.post("/login",clientController.update);



module.exports = router;