const express= require ("express");
const router= express.Router();

const adminAddUserController= require ("../controllers/adminAddUserController.js")

router.get ("/", adminAddUserController.entrarAdminAddUser);


module.exports = router;