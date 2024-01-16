import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
// import { Avatar } from 'antd'
import colteam_logo from '../../../assets/images/colteam_logo.png'
import Address from '../profile_setting/home_address'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { getToken, getUserEmail } from '../../../utils'

function ProfileSetting () {
  // const { auth } = useContext(AuthContext)

  const [count, setCount] = useState({

  })
  //initialize a state for userData
  const [userData, setUserData] = useState({
    email: getUserEmail(),
    Avatar: colteam_logo,
    research_interests: "",
    phone_number: "",
    home_address: {
      street_address: "",
      city: "",
      state: "",
      zip_code: ""
    },
    GitHub_link: "https://github.com/Collaborative-AI",
  })

  const handleChangePhoneNumber = (value) => {
    setUserData({
      ...userData,
      phone_number: value
    })
  }
  const handleChangeResearchInterests = (value) => {
    setUserData({
      ...userData,
      research_interests: value
    })
  }

  const handleChangeAvatar = (value) => {
    setUserData({
      ...userData,
      Avatar: value
    })
  }
  // const handleAddressChange = (newAddress) => {
  //   // console.log("profile page")
  //   console.log(newAddress)
  //   setUserData({
  //     ...userData,
  //     // home_address: newAddress
  //     home_address
  //   })
  //   console.log({
  //     ...userData,
  //     home_address: newAddress
  //   })
  // }
  const handleChangeHomeAddress = (elementName, value) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      home_address: {
        ...prevUserData.home_address,
        [elementName]: value
      }
    }));
  }

  //get profile info 
  useEffect(() => {
    console.log(`Bearer ${getToken()}`)
    axios
      .get("http://localhost:8000/users/profile/view/", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          t: new Date().getTime()
        }
      })
      .then((response) => {
        console.log("info get")
        console.log(response.data)
        //setUserData
        console.log(response.data.location)
        // console.log(typeof response.data.location)
        // const addressInJason =
        //   "{'street_address': ''}".replace(/'/g, '"')
        const addressInJasonFormat = response.data.location.replace(/'/g, '"')
        console.log(JSON.parse(addressInJasonFormat))
        // console.log(JSON.parse(response.data.location).zip_code)
        setUserData(currentUserData=>({
          ...currentUserData,
          research_interests: response.data.research_interests,
          phone_number: response.data.phone_number,
          home_address: JSON.parse(addressInJasonFormat)//JSON.parse(response.data.location),
        }));
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [getToken()])


  //update change to back end
  const handleAllChange = (event) => {
    event.preventDefault()

    const data = {
      email: userData.email,
      phone_number: userData.phone_number,
      Avatar: userData.Avatar,
      research_interests: userData.research_interests,
      home_address: userData.home_address,
      GitHub_link: userData.GitHub_link,
    }
    const config = {
      headers: {
        Authorization: "Bearer " + getToken()
      }
    }
    // Send POST request to Django backend's to change profile info
    axios
      .post('http://localhost:8000/users/profile/update/', data, config)
      .then((response) => {
        // console.log("update change to back end")
        // console.log(response.data)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }

  const handleCancel = () => {
    console.log(`Bearer ${getToken()}`)
    axios
      .get("http://localhost:8000/users/profile/view/", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          t: new Date().getTime()
        }
      })
      .then((response) => {
        console.log("info get")
        console.log(response.data)
        console.log(response.data.location)
        const addressInJasonFormat = response.data.location.replace(/'/g, '"')
        console.log(JSON.parse(addressInJasonFormat))
        setUserData({
          ...userData,
          research_interests: response.data.research_interests,
          phone_number: response.data.phone_number,
          home_address: JSON.parse(addressInJasonFormat)
        })
      })
      .catch((error) => console.error('Error fetching user data:', error))
  };


  return (
    <div>
      <h3>Profile settings</h3>
      <div style={{ width: '85%', margin: 'auto' }}>
        <Form onSubmit={handleAllChange} style={{ marginTop: '40px'}}>
          <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Col>
              <Form.Label style={{ fontSize: '26px' }}> Email </Form.Label>
              <Form.Control 
                style={{ fontSize: '24px' }}
                id="email"
                name='email'
                disabled readOnly defaultValue={userData.email} 
                // onChange={(e) => handleChangeEmail(e.target.value)}
                // onChange={onChange}
                // readOnly={onChange == null}
              />
            </Col>
            <Col>
              <Form.Label style={{ fontSize: '26px' }} for="phone_number"> Phone Number </Form.Label>
              <Form.Control 
                style={{ fontSize: '24px' }}
                type='tel'
                id='phone_number'
                name="phone_number"
                pattern="^1[3-9]\d{9}$"
                value={userData.phone_number}
                // rules={[
                //   {
                //     required: true,
                //     message: 'please inpute your phone number!',
                //   },
                //   {
                //     patetrn: /^1[3-9]\d{9}$/,
                //     message: 'mobile phone number is wrong',
                //     validateTrigger: 'onBlur'
                //   }
                // ]}
                onChange={(e) => handleChangePhoneNumber(e.target.value)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Form.Label style={{ fontSize: '26px' }} for="Avatar"> Choose file to upload </Form.Label>        
            <Form.Control 
              style={{ fontSize: '24px' }}
              type="file" 
              id="Avatar"
              name='Avatar'
              // value={userData.Avatar}
              accept="image/png, image/jpeg"
              onChange={(e) => handleChangeAvatar(e.target.files[0])}/>  
          </Row>
          <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Form.Label style={{ fontSize: '26px' }} for="research_interests"> Research Interests </Form.Label>
            <Form.Control 
              style={{ fontSize: '24px' }}
              type="text"  
              id="research_interests"
              name='research_interests'
              value={userData.research_interests} onChange={(e) => handleChangeResearchInterests(e.target.value)}/>
          </Row>
          <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Form.Label style={{ fontSize: '26px' }} for="home_address"> Home Address </Form.Label>
            <Form.Control 
              style={{ fontSize: '24px' }}
              type="text"  
              id="home_address"
              name='home_address'
              value={userData.home_address.street_address} onChange={(e) => handleChangeHomeAddress('street_address', e.target.value)}/>
          </Row>
          <Row style={{ marginTop: '25px', marginBottom: '25px' }}>
            <Col>
              <Form.Label style={{ fontSize: '26px' }} for="city"> City </Form.Label>
              <Form.Control 
                style={{ fontSize: '24px' }}
                type="text"  
                id="city"
                name='city'
                value={userData.home_address.city} onChange={(e) => handleChangeHomeAddress('city', e.target.value)}/>
              </Col>
            <Col>
              <Form.Label style={{ fontSize: '26px' }} for="state"> State </Form.Label>
              <Form.Control 
                style={{ fontSize: '24px' }}
                type="text"  
                id="state"
                name='state'
                value={userData.home_address.state} onChange={(e) => handleChangeHomeAddress('state', e.target.value)}/>

            </Col>
            <Col>
              <Form.Label style={{ fontSize: '26px' }} for="zip_code"> Zip Code </Form.Label>
              <Form.Control 
                style={{ fontSize: '24px' }}
                type="text"  
                id="zip_code"
                name='zip_code'
                value={userData.home_address.zip_code} onChange={(e) => handleChangeHomeAddress('zip_code', e.target.value)}/>
            </Col>
          </Row>
          {/* <Address onAddressUpdate={handleAddressChange} home_address1={userData.home_address} count={count}></Address> */}
          <Row style={{ marginTop: '45px', marginBottom: '45px' }}>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" type="submit" style={{ fontSize: '26px', width: '300px'}} > Save Changes </Button>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="btn btn-outline-danger" onClick={handleCancel} style={{ fontSize: '26px', width: '300px'}}> Cancel </Button>
            </Col>
          </Row>
        </Form>
      </div >
    </div>
  )
}

export default ProfileSetting