import React from 'react'
import { useSelector } from 'react-redux'
import UserMain from '../components/Settings/User/UserMain'

const SettingsPage = () => {
  const activeSetting = useSelector(state => state.setting.activeSetting)

  return (
    <div className='bg-[#0c0415] h-screen flex-1 flex flex-col'>
      {/* FOR USER SETTINGS! */}
      {activeSetting === 'user' && <UserMain /> }

      {/* FOR PRIVACY! */}
      {activeSetting === 'privacy' && <p className='text-white'>privacy</p>}

      {/* FOR BLOCKED USERS */}
      {activeSetting === 'block' && <p className='text-white'>blocked</p>}

      {/* FOR PREMIUM FEATURES! */}
      {activeSetting === 'premium' && <p className='text-white'>premium</p>}
    </div>
  )
}

export default SettingsPage
