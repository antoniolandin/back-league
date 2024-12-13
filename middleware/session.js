const jwt = require("jsonwebtoken")
const handleError = require("../utils/handleError")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return handleError(res, "No token provided", 401)
        }

        const token = authHeader.split(" ")[1]

        if (!token) {
            return handleError(res, "Invalid token format", 401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithms: ["HS256"] })
        
        req.user = decoded
        next();
    } catch (error) {
        handleError(res, error.message, 500)
    }
}
 
module.exports = { authMiddleware }
