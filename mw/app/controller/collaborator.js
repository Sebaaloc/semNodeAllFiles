const express = require("express");
const error = require('../errores/errores');
const constantes = require('../constantes');
const userService = require('../services/collaborator');
const logger = require('../logger/logger')
router = express.Router();

exports.getCollaborator = async(req, res, next) => {
    try {
        const collaborator = await userService.getCollaboratorById(req.params.id);
        if(collaborator.length === 0){
            throw error(constantes.USER_NOT_FOUND, "Err: Collaborator not found.");
        }
        logger.info(`Queried collaborator: ${req.params.id}`);
        res.send(collaborator);
    } catch(err) {
        next(err)
    }
};

exports.postCollaborator = async(req, res, next) => {
    try {
        const collaboratorResponse = await userService.saveCollaborator(req);
        if(collaboratorResponse === false){
            throw error(constantes.BAD_REQUEST_MONGO, "Err: Collaborator not created in MongoDB.");
        }
        logger.info(`Collaborator created: ${req.body.identificacion}`);
        res.send({ message: "Collaborator created."})         
    } catch(err) {
        next(err)
    }
};

exports.deleteCollaboratorById = async(req, res, next) => {
    try {
        const userResponse = await userService.deleteCollaborator(req.params.id);
        if(userResponse === false){
            throw error(constantes.BAD_REQUEST_MONGO, "Err: Collaborator not deleted in MongoDB.");
        }
        if(userResponse === null){
            throw error(constantes.USER_NOT_FOUND, 
                "Err: Collaborator not deleted in MongoDB because wasn't found.");
        }
        logger.info(`deleted collaborator: ${req.params.id}`);
        res.send({ message: "Collaborator deleted."});        
    } catch(err) {
        next(err)
    }
}