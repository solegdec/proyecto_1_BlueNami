const express= require ("express");
const router= express.Router();

const clientController= require ("../controllers/clientController.js")

const uploadFile= require ('../middlewares/multerMidd.js')
const validations = require ('../middlewares/regFormMidd.js')


router.get ("/register", clientController.register)

router.post("/register", uploadFile.single("avatar"), validations,clientController.processRegister)

router.get ("/login", clientController.login);

router.post("/login",clientController.loginProcess);

router.get("/profile/", clientController.show);

module.exports = router;