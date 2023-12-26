import { useState } from 'react'
import { loginData, registerData } from '../utils/authDataValidate'
import toast from 'react-hot-toast'

export default function useUser () {
  // STATES!
  const [savingNewUser, setSavingNewUser] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)

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
        user: { id, username, email }
      } = response

      // SAVING USER LOCAL STORAGE!
      localStorage.setItem(
        'userData@**@user',
        JSON.stringify({ id, username, email, token })
      )

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

  return {
    userLogin,
    userLogout,
    userRegistration,
    savingNewUser,
    loadingUser,
    setLoadingUser
  }
}
