import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

// AUTHORIZATION MIDDLEWARE!!
export const authProtection = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  // GETTING AUTH TOKEN FROM HEADERS!
  const token = req?.headers?.authorization //Bearer token
  // IF TOKEN IS NULL RETURN 401 AUTH ERROR!
  if (token === null || !token || token === '') {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  console.log({token})

  // GETTING ID  FROM TOKEN!
  const { id } = jwt.verify(token, process.env.JWT_SECRET)

  // REFRESH USER!!
  const user = await User.findById(id)
  // IF NO USER EXISTS RETURN 401 AUTHORIZATION ERROR
  if (!user?.email) {
    return res.status(401).json({ msg: 'invalid token, authorization denied' })
  }

  // ADDING USER TO REQUEST!!
  req.user = user
  // PROCEEDED TO NEXT!
  next()
}
