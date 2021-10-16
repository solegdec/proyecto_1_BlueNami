const express= require ("express");
const router= express.Router();

const clientController= require ("../controllers/clientController.js")

const uploadFile= require ('../middlewares/multerMidd.js')
const validations = require ('../middlewares/regFormMidd.js')
const guestMiddleware = require ('../middlewares/guestMiddleware.js')
const authMiddleware = require ('../middlewares/authMiddleware.js')


router.get ("/register", guestMiddleware, clientController.register)

router.post("/register", uploadFile.single("avatar"), validations,clientController.processRegister)

router.get ("/login", guestMiddleware,clientController.login);

router.post("/login",clientController.processLogin);

router.get("/profile/",authMiddleware,clientController.profile);

router.get("/logout/",clientController.logout);

module.exports = router;
