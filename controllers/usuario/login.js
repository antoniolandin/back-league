const { Usuarios } = require("../../models")
const handleError = require("../../utils/handleError.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const contraseña = req.body.contraseña

        // si no hay body, mostrar error
        if (!nombre || !contraseña) {
            console.log("Error: Los datos del usuario no pueden estar vacíos")
            handleError(res, "Los datos del usuario no pueden estar vacíos", 400)
            return
        }

        // comprobamos que el nombre no esté cogido
        const usuario = await Usuarios.findOne({
            where: {
                nombre: nombre
            }
        })

        // si el nombre ya está en uso mandamos error
        if (!usuario) {
            console.log("Usuario no encontrado")
            handleError(res, "Usuario no encontrado", 404)
            return
        }

        // si las constraseñas coinciden
        if (bcrypt.compare(contraseña, usuario.constraseña)) {
            const token = jwt.sign(
                { id: usuario.id, nombre: usuario.nombre },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "60min",
                }
            )

            res.status(200).json({
                usuario: usuario,
                token: token
            })
        }
        else {
            console.log("Credenciales incorrectas")
            handleError(res, "Crendeciales incorrectas", 400)
        }
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = login
