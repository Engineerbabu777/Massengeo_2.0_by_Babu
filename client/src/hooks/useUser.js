import { useState } from 'react'
import { registerData } from '../utils/authDataValidate'
import toast from 'react-hot-toast'

export default function useUser () {
  // STATES!
  const [savingNewUser, setSavingNewUser] = useState()

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
      if (response.data.error) throw new Error(response.data.error)

      // SETTING STATE BACK TO DEFAULT!
      setSavingNewUser(false)
      toast.success('User registered successfully!') // SHOWING THE TOAST ERROR!

      return true
    } catch (error) {
      // IF USER REGISTRATION FAILED!
      toast.error('User registration failed!')
      console.log({ error: error.message })
      setSavingNewUser(false)
    }
  }

  // FUNCTION TO LOGIN USER!
  const userLogin = () => {}

  const userLogout = () => {}

  return { userLogin, userLogout, userRegistration, savingNewUser }
}
