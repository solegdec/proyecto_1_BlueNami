const express= require ("express");
const router= express.Router();

const clientController= require ("../controllers/clientController.js")

router.get ("/register", clientController.register)
router.post("/register",clientController.store)
router.get ("/login", clientController.login);
router.post("/login",clientController.update)



module.exports = router;