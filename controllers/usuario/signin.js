const { Usuarios } = require("../../models")
const handleError = require("../../utils/handleError.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signin = async (req, res) => {
    try {
        const email = req.body.email
        const contraseña = req.body.contraseña

        // si no hay body, mostrar error
        if (!email || !contraseña) {
            console.log("Error: Los datos del usuario no pueden estar vacíos")
            handleError(res, "Los datos del usuario no pueden estar vacíos", 400)
            return
        }

        // comprobamos que el email no esté cogido
        const usuario = await Usuarios.findOne({
            where: {
                email: email
            }
        })

        // si el email ya está en uso mandamos error
        if (!usuario) {
            console.log("Usuario no encontrado")
            handleError(res, "Usuario no encontrado", 404)
            return
        }
        
        // si las constraseñas coinciden
        bcrypt.compare(contraseña, usuario.contraseña, (err, data) => {
            if (err) {
                console.log(err)
                handleError(res, err, 400)
            }
            else if (data) {
                const token = jwt.sign(
                    { id: usuario.id, email: usuario.email },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "1h",
                        algorithm: "HS256"
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

        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = signin
