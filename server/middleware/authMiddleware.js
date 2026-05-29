import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
   try {
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
         const token = req.headers.authorization.split(" ")[1]

         const decoded = jwt.verify(token, process.env.JWT_SECRET)

         req.user = await User.findById(decoded.id).select('-password')

         next()
      } else {
         return res.status(401).json({ message: "Not authorized" })
      }
   } catch (error) {
      return res.status(500).json({ message: "Server error" })
   }
}

export default protect