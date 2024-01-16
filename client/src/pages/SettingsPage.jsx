import React from 'react'
import { useSelector } from 'react-redux'
import UserMain from '../components/Settings/User/UserMain'
import BlockedUsers from '../components/Settings/Blocked/BlockedUsers'

const SettingsPage = () => {
  const activeSetting = useSelector(state => state.setting.activeSetting)

  return (
    <div className='bg-[#0c0415] h-screen flex-1 flex flex-col'>
      {/* FOR USER SETTINGS! */}
      {activeSetting === 'user' && <UserMain />}

      {/* FOR PRIVACY! */}
      {activeSetting === 'privacy' &&  <BlockedUsers />}

      {/* FOR BLOCKED USERS */}
      {activeSetting === 'block' &&  <BlockedUsers />}

      {/* FOR PREMIUM FEATURES! */}
      {activeSetting === 'premium' && <p className='text-white'>premium</p>}
    </div>
  )
}

export default SettingsPage
