
// import { useEffect, useContext, useState } from 'react'
// import AuthContext from '../AuthProvider.component'
// import axios from 'axios'

// const CharBox = () => {
//   const { auth } = useContext(AuthContext)

//   const [chatHistory, setChatHistory] = useState({
//     list: [{}], //data: {id, message, date}
//     count: 0  //total chat counts
//   })

//   //load chst history
//   useEffect(() => {
//     console.log(`Bearer ${auth.accessToken}`)
//     axios
//       .get("http://localhost:8000/forum/get_thread_by_id/", {
//         headers: {
//           Authorization: `Bearer ${auth.accessToken}`
//         },
//         params: {
//           t: new Date().getTime()
//         }
//       })
//       .then((response) => {
//         console.log("chat history get")
//         console.log(response.data)
//         //TODO: set chat hisoty
//         // setChatHistory({

//         // })
//       })
//       .catch((error) => console.error('Error fetching char history:', error))
//   }, [])

//   return (
//     <div>

//       chatbox
//       <div></div>
//     </div>
//   )

// }

// export default CharBox


import React, { useState } from 'react'

const ChatHistory = ({ messages }) => (
  <div className="chat-history">
    {messages.map((message, index) => (
      <p key={index}>{message}</p>
    ))}
  </div>
)

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

const ChatBox = () => {
  const [messages, setMessages] = useState([])

  const sendMessage = (newMessage) => {
    setMessages([...messages, newMessage])
  }

  return (
    <div className="chat-box">
      <ChatHistory messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  )
}

export default ChatBox
