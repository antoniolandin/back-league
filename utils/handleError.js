const handleError = (res, msg, code) => {
    // Enviamos al cliente un mensaje de error
    res.status(code).json({ msg })
}

module.exports = handleError
