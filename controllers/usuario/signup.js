const { Usuarios } = require("../../models")
const handleError = require("../../utils/handleError.js")
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    try {
        const body = req.body
        
        // si no hay body, mostrar error
        if (!body) {
            console.log("Error: Los datos del usuario no pueden estar vacíos")
            handleError(res, "Los datos del usuario no pueden estar vacíos", 400)
            return
        }

        // especificamos el salteo de la contraseña
        const saltRounds = 5

        // Hash the password
        bcrypt.hash(body.contraseña, saltRounds, (error, hash) => {
            if (error) {
                console.error('Error hasheando la contraseña:', error);
                handleError(res, error, 400)
            } else {
                // creamos el usuario final que tendrá la contraseña hasheada
                let usuario_final = { ...body }
                usuario_final.contraseña = hash

                // creamos el jugador en la base de datos
                Usuarios.create(usuario_final).then((data) => {
                    // respondemos con el usuario creado
                    res.status(201).json(data)
                }).catch((error) => {
                    console.error('Error subiendo usuario a la db:', error);
                    handleError(res, error, 400)
                })
            }
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = signup
