import {MdClose} from 'react-icons/md';

export default function GroupModalSettings ({ open, handleClose }) {
  return (
    <>
      <div
        // onClick={handleClose}
        className={`bg-black/50 fixed flex items-center justify-center left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      >
      {open && 
        <section className='w-full md:max-w-2xl bg-black border-2 border-gray-300 rounded-md '>
          {/* GROUP SETTINGS! */}

          {/* HEADER! */}
          <header className="flex justify-between items-center w-full">
          <h2 className="text-2xl">Group Settings</h2>
          <MdClose className="w-6 h-6 text-red-500 cursor-pointer" onClick={handleClose} />
          </header>

          {/* IMAGE SETTINGS! */}

          {/* GROUP NAME SETTINGS! */}

          {/* GROUP MEMBERS SETTINGS! */}

          {/* GROUP ABOUT! */}

          {/* HANDLE SUBMIT BTN! */}
        </section>
      }
      </div>
    </>
  )
}
