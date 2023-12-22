import Avatar from "./Avatar";
import Name from "./Name";
import {FaAngleDown} from '../../../../icons'
export default function ChatInfo ({}) {
  return (
    <>
      <div className='flex items-center gap-2'>
        {/* IMAGE */}
        <Avatar sm src={"/images/pic4.jpg"}/>

        {/* NAME */}
        <Name sm />

        {/* DOWN */}
        <FaAngleDown className="w-4 h-4 text-gray-400"/>

      </div>
    </>
  )
}
