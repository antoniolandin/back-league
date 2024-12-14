const jwt = require('jsonwebtoken');

// Payload
const payload = {
  id: 1,
  email: "antonio@example.com",
}

// Generar el token
const token = jwt.sign(payload, 'houdini', {
    expiresIn: '1h',
    algorithm: 'HS256'
})

// Imprimir el token (solo el token)
console.log(token)
