const express= require ("express");
const router= express.Router();


const adminController= require ("../controllers/adminController.js")
//list
router.get ("/", adminController.list);



//detail
router.get("/:id", adminController.detail);

//create 
router.get("/create", adminController.create);
router.post("/create", adminController.store);

//edit
router.get("/:id/edit", adminController.edit);
router.put("/:id/edit", adminController.update);

// delete
router.delete("/destroy/:id", adminController.destroy);
module.exports = router;