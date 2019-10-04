const express = require("express"),
    router = express.Router(),
    collaboratorController = require('../controller/collaborator');

router.get("/collaborator/:id", collaboratorController.getCollaborator);
router.post("/collaborator", collaboratorController.postCollaborator);
router.delete("/collaboratortodelete/:id", collaboratorController.deleteCollaboratorById);

module.exports = router;
