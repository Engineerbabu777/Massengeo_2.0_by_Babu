import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

// USER REGISTRATION!
export const registerUser = async (req, res) => {
  try {
    // GET DATA FROM REQ BODY!!!
    const { username, password, email } = req.body

    // ENCRYPTED PASSWORD!
    const hashedPassword = await bcryptjs.hash(password, 32)

    // CREATE NEW USER!!
    await User.create({
      username,
      password: hashedPassword,
      email
    })

    // RETURN SUCCESS RESPONSE!!
    return res
      .status(200)
      .json({ success: true, message: 'user created successfully!' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// USER LOGIN!!
export const loginUser = async (req, res) => {
  try {
    // GET DATA FROM REQ BODY!!!
    const { username, password } = req.body
    // FIND USER BY USERNAME!!
    const user = await User.findOne({ username })
    // VALIDATE USER EXISTS!!
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid credentials' })
    }
    // VALIDATE PASSWORD!!
    const isValidPassword = await bcryptjs.compare(password, user.password)
    // VALIDATE PASSWORD!!
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid credentials' })
    }
    // GENERATE TOKEN!!
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    // RETURN THE SUCCESS RESPONSE!
    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: user.username, email: user.email }
    })
  } catch (error) {
    // RETURN ERROR RESPONSE!
    return res.status(500).json({ success: false, message: error.message })
  }
}


//Find User!
export const findUser = async (req, res) => {
  try {
    //GET ID FROM REQ BODY
    const { id } = req.params
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
