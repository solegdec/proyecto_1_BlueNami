const express= require ("express");
const router= express.Router();

const adminAddController= require ("../controllers/adminAddController.js")

router.get ("/", adminAddController.entrarAdminAdd);




module.exports = router;