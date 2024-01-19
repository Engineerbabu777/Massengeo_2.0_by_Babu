export const userDetails = {
  username: JSON.parse(localStorage.getItem('userData@**@user'))?.username,
  email: JSON.parse(localStorage.getItem('userData@**@user'))?.email,
  avatar:
    JSON.parse(localStorage.getItem('userData@**@user'))?.avatar ||
    'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
  about:
    JSON.parse(localStorage.getItem('userData@**@user'))?.about ||
    'I am a software developer from New York who is passionate about creating innovative solutions.'
}
