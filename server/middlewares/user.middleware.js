import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

// AUTHORIZATION MIDDLEWARE!!
export const authProtection = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  // GETTING AUTH TOKEN FROM HEADERS!
  const token = req.headers.authorization.split(' ')[1] //Bearer token
  // IF TOKEN IS NULL RETURN 401 AUTH ERROR!
  if (token === 'null') {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // GETTING ID  FROM TOKEN!
  const { id } = jwt.verify(token, process.env.JWT_SECRET)

  // REFRESH USER!!
  const user = await User.findById(id)
  // IF NO USER EXISTS RETURN 401 AUTHORIZATION ERROR
  if (!user?.email) {
    return res.status(401).json({ msg: 'invalid token, authorization denied' })
  }
  // PROCEEDED TO NEXT!
  next()
}
