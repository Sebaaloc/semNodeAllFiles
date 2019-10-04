const express = require("express"),
    router = express.Router(),
    productsController = require('../controller/collaborator');

router.get("/collaborator/:id", productsController.getCollaborator);
router.post("/collaborator", productsController.postCollaborator);
router.delete("/collaboratortodelete/:id", productsController.deleteCollaboratorById)
router.patch("/collaboratorupdate/:id", productsController.patchCollaborator);

module.exports = router;
