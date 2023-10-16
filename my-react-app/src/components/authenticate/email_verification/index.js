import React from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
function EmailVerification () {
  const navigate = useNavigate()
  const handleSignIn = (e) => {
    e.preventDefault()
    navigate('/log-in', { replace: true })
  }
  return (
    <div>
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