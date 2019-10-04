const express = require("express");
const userService = require('../services/collaborator');
router = express.Router();

exports.getCollaborator = async(req, res, next) => {
    try {
        const collaborator = await userService.getCollaboratorById(req.params.id);
        if(collaborator.length === 0){
            res.status(404).send("Collaborator not found");    
        }
        res.send(collaborator);
    } catch(err) {
        next(err)
    }
};

exports.postCollaborator = async(req, res, next) => {
    try {
        const collaboratorResponse = await userService.saveCollaborator(req);
        if(collaboratorResponse === false){
            res.status(400).send("Collaborator not created");    
        }
        res.send({ message: "Collaborator created."})         
    } catch(err) {
        next(err)
    }
};

exports.deleteCollaboratorById = async(req, res, next) => {
    try {
        const userResponse = await userService.deleteCollaborator(req.params.id);
        if(userResponse === false){
            res.status(400).send("Collaborator not deleted");    
        }
        if(userResponse === null){
            res.status(400).send("Collaborator to delete not found");    
        }
        res.send({ message: "Collaborator deleted."});        
    } catch(err) {
        next(err)
    }
}

exports.patchCollaborator = async (req, res, next) => {
    try {
        const collaboratorResponse = await userService.updateDoc(req);
        res.send(collaboratorResponse)         
    } catch(err) {
        next(err)
    }
}