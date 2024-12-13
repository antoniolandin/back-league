const jwt = require("jsonwebtoken")
const handleError = require("../utils/handleError")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]
        
        if (!token || token == "Bearer") {
            handleError(res, "Not a token", 401)
            return
        }

        console.log(await jwt.verify(token, process.env.JWT_SECRET))
        //const dataToken = await jwt.verify(token, process.env.JWT_SECRET)
            /*, (err, data) => {
            if (err) {
                handleError(res, "Invalid token", 401)
                return
            }

            console.log(data)

            req.user = data
            next()
        })*/
    } catch (error) {
        handleError(res, error.message, 500)
    }
}
 
module.exports = { authMiddleware }
