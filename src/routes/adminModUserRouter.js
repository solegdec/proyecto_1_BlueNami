const express= require ("express");
const router= express.Router();

const adminModUserController= require ("../controllers/adminModUserController.js")

router.get ("/", adminModUserController.entrarAdminModUser);




module.exports = router;