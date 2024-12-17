const jwt = require('jsonwebtoken');

const parametros = process.argv.slice(2)

// Payload
const payload = {
  id: parametros[0],
  email: parametros[1],
}

// Generar el token
const token = jwt.sign(payload, 'houdini', {
    expiresIn: '1h',
    algorithm: 'HS256'
})

// Imprimir el token (solo el token)
console.log(token)
