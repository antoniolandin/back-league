const jwt = require("jsonwebtoken")
const handleError = require("../utils/handleError")

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ").pop()
        if (!token || token == "Bearer") {
            handleError(res, "Not a token", 401)
            return
        }

        const dataToken = await jwt.verify(token, process.env.JWT_SECRET)
        
        if (!dataToken.email) {
            handleError(res, "Invalid token", 401)
            return
        }
        next()
    } catch (error) {
        handleError(res, error.message, 500)
    }
}
 
module.exports = { authMiddleware }
