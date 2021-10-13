const express= require ("express");
const router= express.Router();

const userController= require ("../controllers/userController.js")


//list
router.get("/", userController.list);

//detail
router.get("/profile/:id", userController.profile);

//create 
router.get("/create", userController.create);
router.post("/create", userController.store);

//edit
router.get("/:id/edit", userController.edit);
router.put("/:id/edit", userController.update);

// delete
router.delete("/destroy/:id", userController.destroy)

module.exports = router;