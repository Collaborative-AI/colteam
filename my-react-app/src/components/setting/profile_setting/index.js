import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../AuthProvider.component'
import axios from 'axios'
// import { Avatar } from 'antd'
import colteam_logo from '../../../images/colteam_logo.png'
import Address from '../profile_setting/home_address'
import Button from 'react-bootstrap/Button'

function ProfileSetting () {
  const { auth } = useContext(AuthContext)
  //initialize a state for userData
  const [userData, setUserData] = useState({
    email: auth.email,
    Avatar: colteam_logo,
    research_interests: "",
    phone_number: "",
    home_address: {
      street_address: '',
      city: '',
      state: '',
      zip_code: ''
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
  const handleAddressChange = (newAddress) => {
    setUserData({
      ...userData,
      home_address: newAddress
    })
  }


  //get profile info 
  useEffect(() => {
    console.log(`Bearer ${auth.accessToken}`)
    axios
      .get("http://localhost:8000/users/profile/view/", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        params: {
          t: new Date().getTime()
        }
      })
      .then((response) => {
        console.log("info get")
        console.log(response.data)
        //setUserData
        setUserData({
          ...userData,
          research_interests: response.data.research_interests
        })
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [])


  //update change to back end
  const handleAllChange = (event) => {
    event.preventDefault()

    const data = {
      email: userData.email,
      Avatar: userData.Avatar,
      research_interests: userData.research_interests,
      home_address: userData.home_addressail,
      GitHub_link: userData.GitHub_link,
    }
    const config = {
      headers: {
        Authorization: "Bearer " + auth.accessToken
      }
    }
    // Send POST request to Django backend's to change profile info
    axios
      .post('http://localhost:8000/users/profile/update/', data, config)
      .then((response) => {
        console.log("update change to back end")
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }

  return (
    <div>
      <h3>Profile settings</h3>
      <form onSubmit={handleAllChange} style={{ marginTop: '40px' }}>
        <p>
          <lable for="email">Email</lable><br></br>
          <input
            type="text"
            id="email"
            name='email'
            value={userData.email}
          // onChange={(e) => handleChangeEmail(e.target.value)}
          // onChange={onChange}
          // readOnly={onChange == null}
          />
        </p>
        <p>
          <lable for="phone_number">Phone Number</lable><br></br>
          <input
            type='type'
            id='phone_number'
            name="phone_number"
            value={userData.phone_number}
            onChange={(e) => handleChangePhoneNumber(e.target.value)}
          >
          </input>
        </p>
        <p>
          <label for="Avatar">Choose file to upload</label><br></br>
          <input
            type="file"
            id="Avatar"
            name='Avatar'
            // value={userData.Avatar}
            accept="image/png, image/jpeg"
            onChange={(e) => handleChangeAvatar(e.target.files[0])}>
          </input>
        </p>
        <lable for="research_interests">research interests</lable><br></br>
        <input
          type="text"
          id="research_interests"
          name='research_interests'
          value={userData.research_interests}
          onChange={(e) => handleChangeResearchInterests(e.target.value)}>
        </input>
        <Address onAddssUpdate={handleAddressChange}></Address>
        <p></p>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </div>

  )
}

export default ProfileSetting