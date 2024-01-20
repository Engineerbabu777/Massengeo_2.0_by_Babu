import { useState } from 'react'
import { loginData, registerData } from '../utils/authDataValidate'
import toast from 'react-hot-toast'
import {
  fetchedSearchUsers,
  fetchedUsers,
  fetchingSearchUsers,
  fetchingUsers,
  fetchingUsersSuccess,
  updatingUser,
  userHasUpdated
} from '../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  getWholeUserDetails,
  updateUserBlockedListInLocalStorage,
  userDetails
} from '../utils/getUserDetails'
export default function useUser () {
  // STATES!
  const [savingNewUser, setSavingNewUser] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const isALreadyGetUsers = useSelector(state => state.user.alreadyLoadedUsers)
  const dispatch = useDispatch()

  // FUNCTION FOR NEW USER REGISTRATION!
  const userRegistration = async data => {
    try {
      // DATA VALIDATIONS!
      registerData(data)

      // STATING STATE TO LOADING...
      setSavingNewUser(true)

      // THEN MAKE REQUEST!
      const response = await fetch(
        'http://localhost:4444/api/v1/user/register',
        {
          method: 'POST', // METHOD POST!
          headers: {
            // HEADERS
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // BODY IS IN JSON FORMAT!
        }
      ).then(res => res.json())

      // IF ERROR THEN THROW THE ERROR!
      if (response?.error) throw new Error(response.message)

      // SETTING STATE BACK TO DEFAULT!
      setSavingNewUser(false)
      toast.success('User registered successfully!') // SHOWING THE TOAST ERROR!

      return true
    } catch (error) {
      // IF USER REGISTRATION FAILED!
      toast.error(error.message)
      console.log({ error: error.message })
      setSavingNewUser(false)
    }
  }

  // FUNCTION TO LOGIN USER!
  const userLogin = async data => {
    try {
      // DATA VALIDATIONS!
      loginData(data)

      // STATING STATE TO LOADING...
      setLoadingUser(true)

      // THEN MAKE REQUEST!
      const response = await fetch('http://localhost:4444/api/v1/user/login', {
        method: 'POST', // METHOD POST!
        headers: {
          // HEADERS
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // BODY IS IN JSON FORMAT!
      }).then(res => res.json())

      // IF ERROR THEN THROW THE ERROR!
      if (response?.error) throw new Error(response?.message)

      // GET USER DATA (ID, username, EMAIL) AND SAVE IN LOCAL STORAGE!
      const {
        token,
        user: { id, username, email, image, blockedList, about }
      } = response

      console.log({ token, id, username, email, image, blockedList, about })

      // SAVING USER LOCAL STORAGE!
      localStorage.setItem(
        'userData@**@user',
        JSON.stringify({
          id,
          username,
          email,
          token,
          image,
          blockedList,
          about
        })
      )

      localStorage.setItem('token', token)

      // SETTING STATE BACK TO DEFAULT!
      setLoadingUser(false)
      toast.success('User Logged successfully!') // SHOWING THE TOAST ERROR!

      return true
    } catch (error) {
      // IF USER LOGIN FAILED!
      toast.error(error.message)
      console.log({ error: error.message })
      setLoadingUser(false)
    }
  }

  const userLogout = () => {}

  // GET ALL USERS FUNCTION!
  const getAllUsers = async () => {
    if (isALreadyGetUsers) return // USERS ALREADY FETCHED!

    dispatch(fetchingUsers())
    // FETCHING USERS API REQUEST!
    const response = await fetch('http://localhost:4444/api/v1/user/users', {
      method: 'GET',
      headers: {
        authorization: JSON.parse(localStorage.getItem('userData@**@user'))
          ?.token
      }
    }).then(res => res.json())

    // IF SUCCESS IS TRUE!
    if (response?.success) {
      dispatch(fetchingUsersSuccess())
      dispatch(fetchedUsers(response?.users))
    }
  }

  // FIND USERS!
  const findUsers = async search => {
    try {
      dispatch(fetchingSearchUsers())
      // FETCHING USERS API REQUEST!
      const response = await fetch(
        'http://localhost:4444/api/v1/user/users?search=' + search,
        {
          method: 'GET',
          headers: {
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          }
        }
      ).then(res => res.json())

      if (response?.error) throw new Error(response.message)

      dispatch(fetchedSearchUsers(response.users))
    } catch (error) {
      // IF USERS SEARCHING FAILED!
      toast.error(error.message)
      console.log({ error: error.message })
    }
  }

  // UPDATE USER DATA!
  const updateUserData = async userData => {
    try {
      // SET USER IS UPDATING!
      dispatch(updatingUser())

      // THEN MAKE REQUEST!
      const response = await fetch(
        'http://localhost:4444/api/v1/user/user-update',
        {
          method: 'PUT', // METHOD PUT!
          headers: {
            // HEADERS
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          body: JSON.stringify(userData) // BODY IS IN JSON FORMAT!
        }
      )
      const data = await response.json()

      // IF ERROR THEN THROW THE ERROR!
      if (data?.error) throw new Error(data.message)

      console.log(data.userData)

      // SETTING STATE BACK TO DEFAULT!
      dispatch(userHasUpdated(data.userData))
      toast.success('User updated successfully!') // SHOWING THE TOAST ERROR!

      return true
    } catch (error) {
      // IF USER UPDATE FAILED!
      toast.error(error.message)
      console.log({ error: error.message })
      setSavingNewUser(false)
    }
  }

  // BLOCK UNBLOCK USERS!
  const updateBlockUnBlockUsers = async (userId, action) => {
    try {
      // SET USER IS BLOCKING!
      // dispatch(updatingUser())
      console.log(userId, action);
      toast.success(`user is been ${action} !`)

      // THEN MAKE REQUEST!
      const response = await fetch(
        'http://localhost:4444/api/v1/user/block-unblock-user',
        {
          method: 'PUT', // METHOD PUT!
          headers: {
            // HEADERS
            'Content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          body: JSON.stringify({ userId, action }) // BODY IS IN JSON FORMAT!
        }
      )
      const data = await response.json()

      // IF ERROR THEN THROW THE ERROR!
      if (data?.error) throw new Error(data.message)

      console.log(data)

      if (data.success) {
        console.log(userId, action)

        // SETTING STATE BACK TO DEFAULT!
        // dispatch(userHasUpdated(data.userData))
        toast.success('User blocked successfully!') // SHOWING THE TOAST ERROR!

        // update user data in local storage!
        updateUserBlockedListInLocalStorage(userId, action)
      }
    } catch (error) {
      // IF USER UPDATE FAILED!
      toast.error(error.message)
      console.log({ error: error.message })
      // setSavingNewUser(false)
    }
  }

  return {
    userLogin,
    userLogout,
    userRegistration,
    savingNewUser,
    loadingUser,
    setLoadingUser,
    getAllUsers,
    findUsers,
    updateUserData,
    updateBlockUnBlockUsers
  }
}
