const express= require ("express");
const router= express.Router();



const clientController= require ("../controllers/clientController.js")

const uploadFile= require ("../middlewares/multerMidd.js")
const validations=require ("../middlewares/regFormMidd.js")




router.get ("/register", clientController.create)

router.post("/register", uploadFile.single("avatar"),validations,clientController.store)

router.get('/profile/', clientController.profile);

router.get ("/login", clientController.login);

//router.post("/login",clientController.update);



module.exports = router;