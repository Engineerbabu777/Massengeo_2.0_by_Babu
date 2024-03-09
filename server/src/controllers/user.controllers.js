import { User } from '../models/user.model.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Story } from '../models/stories.model.js'

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
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user?.avatar,
        blockedList: user?.blockedList,
        about: user?.about
      }
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

// GET ALL USERS!
export const getAllUsers = async (req, res) => {
  try {
    // MAY BE WE HAVE TO FIND FOR SPECIFIC USERS!
    if (req?.query?.search) {
      // CREATING NEW CASE INSENSITIVE REGULAR EXPRESSION!
      const search = new RegExp(req.query.search, 'i')

      const users = await User.find({
        $and: [
          {
            // FIND USERS WHERE THOSE USERNAME ARE EQUAL TO REQUIRED!
            $or: [{ username: search }, { email: search }]
          },
          {
            // BUT REMOVE THOSE USERS WHERE USERNAME ARE EQUAL TO THAT USER REQUESTING!
            username: { $ne: req.user.username }
          }
        ]
      })
      // RETURNING RESPONSE BACK TO USER!
      return res.status(200).json({ success: true, users: users })
    }
    //FIND ALL USERS BUT EXCLUDED THE REQUESTED USER!
    const users = await User.find({ _id: { $ne: req.user._id } })
    //RETURN ALL USERS
    return res.status(200).json({ success: true, users: users })
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message })
  }
}

// UPDATE USER INFORMATION!!
export const updateUser = async (req, res) => {
  try {
    // EXTRACT DATA!
    const { avatar, username, about } = req.body

    // USER ID!
    const userId = req.user._id

    // UPDATE DATA TO DATABASE!
    await User.findByIdAndUpdate(
      userId,
      { avatar, username, about },
      { new: true }
    )

    // RETURN BACK THE RESPONSE!!
    return res.status(200).json({
      success: true,
      userData: await User.findById(userId).select(
        'username email avatar about blockedList'
      ),
      message: 'User data updated successfully!'
    })
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message })
  }
}

// BLOCK USER / UNBLOCK!
export const blockUnblockUser = async (req, res) => {
  try {
    // EXTRACT DATA!
    const { userId, action } = req.body
    // EXTRACT USER ID!
    const requestedUserID = req.user._id

    // USER WANTS TO BLOCK THE USER!
    if (action === 'block') {
      await User.findByIdAndUpdate(requestedUserID, {
        $push: {
          blockedList: userId
        }
      })
      // RETURNING THE SUCCESS RESPONSE TO THE USER!
      return res.status(200).json({
        success: true,
        message: 'User blocked successfully!'
      })
    }

    // USER WANTS TO UNBLOCK THE USER!
    if (action === 'unblock') {
      await User.findByIdAndUpdate(requestedUserID, {
        $pull: {
          blockedList: userId
        }
      })
      // RETURNING THE SUCCESS RESPONSE TO THE USER!

      return res
        .status(200)
        .json({ success: 'true', message: 'User unblocked successfully!' })
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message })
  }
}

// GET ALL BLOCKED USERS!
export const getBlockedUsers = async (req, res) => {
  try {
    // FETCHING AND POPULATING USERS!
    const blockedListUsers = await User.findById(req.user.id)
      .select('blockedList')
      .populate({
        path: 'blockedList',
        select: 'avatar username email'
      })
    // RETURNING BACK RESPONSE!
    return res.status(200).json({
      success: 'true',
      message: 'fetched all users successfully!',
      blockedListUsers
    })
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message })
  }
}
// MAKE USER TO BE AS PREMIUM USER!
// to be include

// USER FORGOT PASSWORD!!
// to be include

// USER VERIFY EMAIL!
// to be include

// USER STORY CREATION!
export const userStoryCreation = async(req,res) => {

  try {
    
    const user = req.user; 
    const body = req.body;

    console.log({body});

    // CREATE A NEW STORY!
    const story = await Story.create({
      storyType: body.type,
      userId: user._id,
      statusImage: body.type === "image" ? body.data : null,
      backgroundColor:  body.type === "text" ? body.data.backgroundColor : null,
      fontFamily: body.type === "text" ? body.data.fontFamily : null,
      storyText:body.type === "text" ? body.data.storyText : null,
      textColor:body.type === "text" ? body.data.textColor : null,
    });

    // UPDATE THE USER STORIES!
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $push: {stories: story._id}  
    },{
      upsert:true,
      new:true,
    }).populate("stories blockedList")

    Story.createIndexes()


    res.status(200).json({success:true,message:"Success",updatedUser});
  } catch (error) {
    console.log({"error creating stories ":error})
    res.status(501).json({error:true,"message":error.message});
  }
}

// USER STORY REMOVAL!
export const storyDeletion = async(req,res) => {
  try {
    
  } catch (error) {
    
  }
}
