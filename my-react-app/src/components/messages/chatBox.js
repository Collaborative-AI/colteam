
import { useEffect, useContext, useState } from 'react'
import { getToken } from '../../utils'
import axios from 'axios'
import './chatBox.scss'

const CharBox = () => {
  // const { auth } = useContext(AuthContext)

  const [chatHistory, setChatHistory] = useState({
    list: [{}], //data: {id, message, date}
    count: 0  //total chat counts
  })

  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      //TODO: update chat history to serve
      setChatHistory({
        list: [...chatHistory.list, { id: "", message: input, date: "" }],
        count: chatHistory.count + 1
      })
      setInput('')
    }
  }

  //load chst history
  useEffect(() => {
    console.log(`Bearer ${getToken()}`)
    axios
      .get("http://localhost:8000/forum/get_thread_by_id/", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          t: new Date().getTime()
        }
      })
      .then((response) => {
        console.log("chat history get")
        console.log(response.data)
        //TODO: set chat hisoty
        // setChatHistory({

        // })
      })
      .catch((error) => console.error('Error fetching char history:', error))
  }, [])

  return (
    <div className="chat-box">
      <div className="chat-history">
        {chatHistory.list.map(({ message }, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form className="message-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        >
        </input>
        <button type="submit"> send </button>
      </form>
    </div>
  )

}

export default CharBox


