import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../AuthProvider.component'
import axios from 'axios'

function ProfileSetting () {
  const { auth } = useContext(AuthContext)
  const [userData, setUserData] = useState({})

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
      <form>

      </form>
    </div>

  )
}

export default ProfileSetting