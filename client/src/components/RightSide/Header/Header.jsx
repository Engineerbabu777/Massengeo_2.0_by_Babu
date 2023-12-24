import Avatar from "./components/Avatar";
import ChatInfo from "./components/ChatInfo";
import GroupChat from "./components/GroupChat";
import SearchChatMessage from "./components/SearchChatMessage";
import SingleChat from "./components/SingleChat";

export default function Header ({openSideModal,open}) {
  return (
    <div className='border-b-2 border-gray-700 px-5 py-3 flex items-center'>
      {/* IMAGE! */}
      <Avatar src={'/images/pic4.jpg'} online={true}/>


      {/* NAME & LAST SEEN for single chats */}
      <SingleChat />
       
      {/* NAME & members length for group chats */}
      {/* <GroupChat /> */}


      {/* SEARCH FOR CHAT */}
      <SearchChatMessage />

      {/* INFO about single chat */}
      <ChatInfo openSideModal={openSideModal} open={open}/>

    </div>
  )
}
