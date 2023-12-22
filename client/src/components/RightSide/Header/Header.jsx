import Avatar from "./components/Avatar";
import ChatInfo from "./components/ChatInfo";
import SearchChatMessage from "./components/SearchChatMessage";
import SingleChat from "./components/SingleChat";

export default function Header ({}) {
  return (
    <div className='border-b-2 border-gray-700 px-5 py-3 flex items-center'>
      {/* IMAGE! */}
      <Avatar src={'/images/pic4.jpg'}/>


      {/* NAME & LAST SEEN for single chats */}
      <SingleChat />
       
      {/* NAME & members length for group chats */}

      {/* SEARCH FOR CHAT */}
      <SearchChatMessage />

      {/* INFO about single chat */}
      <ChatInfo />

    </div>
  )
}
