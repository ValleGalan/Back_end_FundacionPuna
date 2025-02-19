import jwt from 'jsonwebtoken'
export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' }) //next(403, 'Unathorized')
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            return res.status(403).json({ message: 'Unauthorized' })//next(403, 'Unathorized')
        }
    } catch (error) {
        res.status(500).json({ message: error.message }) //next(500, error.message)
    }
}