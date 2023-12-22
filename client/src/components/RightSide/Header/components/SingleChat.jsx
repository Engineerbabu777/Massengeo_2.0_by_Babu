import Name from './Name'
import OnlineStatus from './OnlineStatus'

export default function SingleChat ({}) {
  return (
    <div className='flex flex-col flex-1'>
      <Name />
      <OnlineStatus />
    </div>
  )
}
