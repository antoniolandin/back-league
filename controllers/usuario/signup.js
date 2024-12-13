const { Usuarios } = require("../../models")
const handleError = require("../../utils/handleError.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

        const email_minusculas = body.email.toLowerCase()

        // comprobamos que el email no esté cogido
        const usuario = await Usuarios.findOne({
            where: {
                email: email_minusculas
            }
        })

        // si el email ya está en uso mandamos error
        if (usuario) {
            console.log(`Error: el email ${body.email} ya está en uso`)
            handleError(res, `Error: el email ${body.email} ya está en uso`, 400)
            return
        }

        // hasheamos la contraseña
        bcrypt.hash(body.contraseña, saltRounds, (error, hash) => {
            if (error) {
                console.error('Error hasheando la contraseña:', error);
                handleError(res, error, 400)
            } else {
                // creamos el usuario
                let usuario_final = { ...body }

                // cambiamos su email y contraseña
                usuario_final.contraseña = hash
                usuario_final.email = email_minusculas

                // creamos el token jwt
                const token = jwt.sign(
                    {id: usuario_final.id, email: usuario_final.email},
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "60min",
                    }
                ) 

                // creamos el jugador en la base de datos
                Usuarios.create(usuario_final).then((usr) => {
                    // respondemos con el usuario creado
                    res.status(201).json({
                        usuario: usr,
                        token: token
                    })
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
