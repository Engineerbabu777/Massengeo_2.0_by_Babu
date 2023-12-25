


export const registerData = data => {
  // CHECK FOR PASSWORD LENGTH AT LEAST 8!
  if (data.password.length < 8)
    throw new Error('Password must be at least 8 characters long!')

  // CHECK FOR USERNAME AT LEAST 3 CHARACTERS!
  if (data.username.length < 3)
    throw new Error('Username must be at least 3 characters long!')

  // CHECK FOR VALID EMAIL!
  if (
    !data.email.includes('@') ||
    !data.email.includes('.') ||
    data.email.length < 5
  )
    throw new Error('Please enter a valid email!')
}

export const loginData = data => {
  // CHECK FOR PASSWORD LENGTH AT LEAST 8!
  if (data?.password?.length < 8)
    throw new Error('Password must be at least 8 characters long!')

  // CHECK FOR VALID EMAIL!
  if (
    !data?.email.includes('@') ||
    !data?.email.includes('.') ||
    data?.email.length < 5
  )
    throw new Error('Please enter a valid email!')
}
