const express= require ("express");
const router= express.Router();
const multer=require("multer")
const clientController= require ("../controllers/clientController.js")

//este router maneja login y register
const validations = require ('../middlewares/regFormMidd.js')
const guestMiddleware = require ('../middlewares/guestMiddleware.js')
const authMiddleware = require ('../middlewares/authMiddleware.js');
const fileUpload = require("../middlewares/userMulterMidd.js");


router.get ("/register", guestMiddleware, clientController.register)

router.post("/register", fileUpload.single("avatar"), validations,clientController.processRegister)

router.get ("/login", guestMiddleware,clientController.login);

router.post("/login",clientController.processLogin);

router.get("/profile/",authMiddleware,clientController.profile);

router.get("/logout/",clientController.logout);

module.exports = router;
