const express= require ("express");
const router= express.Router();

const clientController= require ("../controllers/clientController.js")

const uploadFile= require ('../middlewares/multerMidd.js')
const validations = require ('../middlewares/regFormMidd.js')


router.get ("/register", clientController.create)

router.post("/register", /*uploadFile.single("avatar"),*/ validations,clientController.store)

router.get ("/login", clientController.showLogin);

router.post("/login",clientController.login);

router.get("/profile", clientController.show);

module.exports = router;