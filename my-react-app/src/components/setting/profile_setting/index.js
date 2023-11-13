import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../AuthProvider.component'
import axios from 'axios'
import { Avatar } from 'antd'
import colteam_logo from '../../../images/colteam_logo.png'
import Address from '../profile_setting/home_address'

function ProfileSetting () {
  const { auth } = useContext(AuthContext)
  //initialize a state for userData
  const [userData, setUserData] = useState({
    email: auth.email,
    Avatar: colteam_logo,
    research_interests: "Machine Learning",
    home_address: {
      street_address: '',
      city: '',
      state: '',
      zip_code: ''
    },
    GitHub_link: "https://github.com/Collaborative-AI",
  })

  const handleChangeEmail = (value) => {
    setUserData({
      ...userData,
      email: value
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
      })
      .then((response) => {
        console.log(response)
        //setUserData
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [])

  return (

    <div>
      <h3>Profile settings</h3>
      <form onSubmit={() => { }}>
        <p>
          <lable for="email">Email</lable><br></br>
          <input
            type="text"
            id="email"
            name='email'
            value={userData.email}
            onChange={(e) => handleChangeEmail(e.target.value)}>
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
        <lable for="emresearch_interestsail">research interests</lable><br></br>
        <input
          type="text"
          id="research_interests"
          name='research_interests'
          value={userData.research_interests}
          onChange={(e) => handleChangeResearchInterests(e.target.value)}>
        </input>
        <Address onAddressUpdate={handleAddressChange}></Address>
      </form>
    </div>

  )
}

export default ProfileSetting