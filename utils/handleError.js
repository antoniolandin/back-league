const handleError = (res, message, code) => {
    // Enviamos al cliente un mensaje de error
    res.status(code).json({ message: message })
}

module.exports = handleError
