import { User } from '../models/user.model.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// USER REGISTRATION!
export const registerUser = async (req, res) => {
  try {
    // ENCRYPTED PASSWORD AFTER THAT STORE IN DATABASE!
    const { password } = req.body

    // GENERATING HASHED PASSWORD!
    const hashedPassword = bcrypt.hashSync(password, 8)

    // CREATING NEW USER!
    await User.create({ ...req.body, password: hashedPassword })

    // RETURN SUCCESS RESPONSE!!
    res
      .status(200)
      .json({ success: true, message: 'user created successfully!' })
  } catch (error) {
    res.status(500).json({ error: true, message: error.message })
  }
}

// USER LOGIN!!
export const loginUser = async (req, res) => {
  try {
    // GET DATA FROM REQ BODY!!!
    const { email, password } = req.body

    // FIND USER BY USERNAME!!
    const user = await User.findOne({ email })

    // VALIDATE USER EXISTS!!
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid credentials', error: true })
    }

    // VALIDATE PASSWORD!!
    const isValidPassword = await bcrypt.compare(password, user.password)

    // VALIDATE PASSWORD!!
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid credentials', error: true })
    }

    // GENERATE TOKEN!!
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    // RETURN THE SUCCESS RESPONSE!
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email }
    })
  } catch (error) {
    // RETURN ERROR RESPONSE!
    res
      .status(500)
      .json({ success: false, message: error.message, error: true })
  }
}

//Find User!
export const findUser = async (req, res) => {
  try {
    //GET ID FROM REQ BODY
    const { id } = req.query

    //FIND USER BY ID
    const user = await User.findById(id)

    //RETURN USER
    return res.status(200).json({ success: true, user: user })
  } catch (error) {
    // RETURN ERROR RESPONSE!
    return res.status(500).json({ success: false, message: error.message })
  }
}

// USER FORGOT PASSWORD!!
// USER VERIFY EMAIL!
