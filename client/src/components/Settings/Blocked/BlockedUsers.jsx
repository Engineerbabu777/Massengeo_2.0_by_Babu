import React, { useEffect } from 'react'
import SingleComponent from './SingleComponent'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'

const BlockedUsers = () => {
  const { fetchedAllBlockedUsers } = useUser()
  const blockedUsers = useSelector(state => state.user.blockedUsers)

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      await fetchedAllBlockedUsers()
    }
    fetchBlockedUsers()
  }, [])

  return (
    <>
      <section className='m-5'>
        {/* HEADER! */}
        <h1 className='text-3xl text-white font-bold tracking-wider '>
          Blocked Users
        </h1>

        {/* GRIDS AT LEAST 5 ON THIS SCREEN! */}
        <section className='grid grid-cols-4 gap-4 mt-12'>
          {blockedUsers?.length > 0 &&
            blockedUsers?.map((user, index) => (
              <>
                <SingleComponent
                  username={user.username}
                  avatar={user?.avatar}
                />
              </>
            ))}
        </section>
      </section>
    </>
  )
}

export default BlockedUsers
