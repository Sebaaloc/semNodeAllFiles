const mongoose = require('../dbconnection/dbConnectionMongo');
const collaborator = require('../model/collaborator');

exports.getCollaboratorById = async id => {
    const idToSearch = parseInt(id);
    return await collaborator.find({identificacion: idToSearch}).select("-__v");
}

exports.saveCollaborator = collaboratorInfo => {
    const collaboratorToSave = new collaborator({
        identificacion: collaboratorInfo.body.identificacion,
        nombre: collaboratorInfo.body.nombre,
        apellido: collaboratorInfo.body.apellido,
        cargo: collaboratorInfo.body.cargo,
        usuarioRed: collaboratorInfo.body.usuarioRed,
        estado: collaboratorInfo.body.estado,
        fechaRegistro: collaboratorInfo.body.fechaRegistro
    });
    collaboratorToSave.save()
    .then(true)
    .catch(false);
}

exports.deleteCollaborator = async id => {
    const idToSearch = parseInt(id);
    return await collaborator.find({identificacion: idToSearch}).remove()
    .then(didItDelete => {
        if(checkIfMongoDeleted(didItDelete) === true){
            return null;
        };
        return true;    
    })
    .catch(false);
}

const checkIfMongoDeleted = mongoResponse => {
    if(mongoResponse.deletedCount === 0){
        return true;
    }
    return false;
}

exports.updateDoc = async data => {
    
    return await collaborator.findOneAndUpdate({identificacion: data.params.id}, 
        {$set: data.body},{new: true})
}