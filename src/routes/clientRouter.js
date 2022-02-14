const express= require ("express");
const router= express.Router();
const multer=require("multer")
const clientController= require ("../controllers/clientController.js")

//este router maneja login y register
const validar = require ('../middlewares/validForms.js')
const guestMiddleware = require ('../middlewares/guestMiddleware.js')
const authMiddleware = require ('../middlewares/authMiddleware.js');
const fileUpload = require("../middlewares/userMulterMidd.js");

router.get ("/register", guestMiddleware, clientController.register)

router.post("/register", fileUpload.single("avatar"), validar.register,clientController.processRegister);

router.get ("/login", guestMiddleware,clientController.login);

router.post("/login", validar.login,clientController.processLogin);

router.get("/profile",authMiddleware,clientController.profile);

router.get('/account', clientController.account);

router.get("/logout",clientController.logout);

router.get("/borrado",clientController.listaBorrados);

router.delete("/destroy/:id", clientController.destroy);

module.exports = router