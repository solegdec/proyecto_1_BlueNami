const express= require ("express");
const router= express.Router();

const clientController= require ("../controllers/clientController.js")

const uploadFile= require ('../middlewares/multerMidd.js')
const validations = require ('../middlewares/regFormMidd.js')


<<<<<<< HEAD
router.get('/profile/', clientController.profile);
=======
router.get ("/register", clientController.create)
>>>>>>> fcb2cc83bfb2f9a064fb6bc4b5c337f1c9e5cdea

router.post("/register", /*uploadFile.single("avatar"),*/ validations,clientController.store)

<<<<<<< HEAD
//router.post("/login",clientController.update);
=======
router.get ("/login", clientController.showLogin);
>>>>>>> fcb2cc83bfb2f9a064fb6bc4b5c337f1c9e5cdea

router.post("/login",clientController.login);

router.get("/profile", clientController.show);

module.exports = router;