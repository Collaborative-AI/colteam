import React, { useState } from 'react'
import { Chat } from 'react-jwchat'
import { contact, my } from "./ChatData";

export default function () {
  const [chatListData, setChatListData] = useState([])
  return (
      <Chat
        contact={contact}
        me={my}
        chatList={chatListData}
        onSend={(msg) => setChatListData([...chatListData, msg])}
        onEarlier={() => console.log('EarlierEarlier')}
        style={{
          width: 600,
          height: 500,
          borderRadius: 5,
          border: '1px solid rgb(226, 226, 226)'
      }}
      />
  )
}