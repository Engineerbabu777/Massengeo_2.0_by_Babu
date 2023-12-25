import { User } from '../models/user.model.js'

// USER REGISTRATION!
export const registerUser = async (req, res) => {
  try {
    // GET DATA FROM REQ BODY!!!
    const { username, password, email } = req.body

    // CREATE NEW USER!!
    const newUser = await User.create({
      username,
      password,
      email
    })

    // RETURN SUCCESS RESPONSE!!
    return res
      .status(200)
      .json({ success: true, message: 'user created successfully!' })
  } catch (error) {}
}

// USER LOGIN!!

// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!
