const Profesor = require('../models/profesor');

exports.agregarProfesor = async(req, res) =>  {

    const {nickname, contrasenia} = req.body;

    try{
        const nuevoProfesor = await Profesor.create({
            nickname,
            contrasenia
        });
    
        res.status(201).json({
            mensaje: 'Profesor creado con éxito',
            profesor: nuevoProfesor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error al crear Profesor',
            error: error.message
        })
    }
};

exports.eliminarProfesor = async(req, res) => {
    const {id_usuario} = req.body;

    try{
        const profesoEliminado = await Profesor.destroy({
            where: {
                id_usuario
            }
        });
    
        if(profesoEliminado){
            res.status(200).json({
                mensaje: 'Profesor eliminado correctamente'
            })
        } else {
            res.status(404).json({
                mensaje: 'Profesor no encontrado'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al eliminar al profesor',
            error: error.message
        });
    }
};
