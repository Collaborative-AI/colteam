import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function EmailVerification () {

  const [counts, setCounts] = useState(5)

  const countDown = () => {
    if (counts <= 0) {
      return
    }
    setCounts(counts - 1)
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleResend = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8000/users/resendVerify/', { username: location.state.username })
      .then((response) => {
        console.log(response.status)
      })
      .catch((error) => {
        console.log(error.response.status)
        // Handle errors
        if (error.response) {
          console.error('Status Code:', error.response.status)

          console.error('Data:', error.response.data)
          console.error('Response Header:', error.response.headers)
        } else {
          console.error('Error:', error.message)
        }

      })

    setCounts(5)

  }
  const handleSignIn = (e) => {
    e.preventDefault()
    navigate('/log-in', { replace: true })
  }


  useEffect(() => {
    const interval = setInterval(() => {
      countDown()
    }, 1000)

    return () => clearInterval(interval)
  }, [counts])

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block onClick={counts == 0 ? handleResend : () => { }}>
          you can resend the verification after {counts}.
        </Button>
      </Space>
      <div className="hint-container">
        <div className="hint-text ">Please check your email to active your account</div>
        <div className="hint-text ">already activated your account?</div>
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block onClick={handleSignIn}>
          already activated your account? please click here to login
        </Button>
      </Space>
    </div>
  )
}

export default EmailVerification