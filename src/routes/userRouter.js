const express= require ("express");
const router= express.Router();




const validar = require ('../middlewares/validForms.js');
const fileUpload = require("../middlewares/userMulterMidd.js");

const userController= require ("../controllers/userController.js");




//rutas que manejan la crud de usuarios desde admin


//list
router.get("/", userController.list);

//detail
router.get("/profile/:id", userController.profile);

//create 
router.get("/create",userController.create);
router.post("/create",fileUpload.single("avatar"),validar.userAdd, userController.store);

//edit
router.get("/:id/edit", userController.edit);
router.put("/:id/edit",fileUpload.single("avatar"), userController.update);

// delete
router.delete("/destroy/:id", userController.destroy)

module.exports = router;