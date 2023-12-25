export default function useUser () {
  const userRegistration = data => {
    // DATA VALIDATIONS!
    // CHECK FOR PASSWORD LENGTH AT LEAST 8!
    // CHECK FOR USERNAME AT LEAST 3 CHARACTERS!
    // CHECK FOR VALID EMAIL!
    // THEN MAKE REQUEST!

    fetch('http://localhost:4444/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json().then(data => console.log({ data })))
  }

  const userLogin = () => {}

  const userLogout = () => {}

  return { userLogin, userLogout, userRegistration }
}
