import jwt from 'jsonwebtoken'
export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });//next(403, 'Unathorized')
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeToken  // Usuario decodificado
        next()
    } catch (error) {
        res.status(500).json({ message: error.message }); // Devuelve el error en caso de falla//next(500, error.message)
    }
}