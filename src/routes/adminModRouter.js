const express= require ("express");
const router= express.Router();

const adminModController= require ("../controllers/adminModController.js")

router.get ("/", adminModController.entrarAdminMod);




module.exports = router;