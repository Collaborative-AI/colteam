import React from 'react'
import { useState } from 'react'
function Address ({ onAddressUpdate }) {

  const [address, setAddress] = useState({
    street_address: '',
    city: '',
    state: '',
    zip_code: ''
  })

  const handleChange = (event) => {
    // event.preventDefault()
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    })
    onAddressUpdate({
      ...address,
      [event.target.name]: event.target.value
    })
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // 通知父组件，地址已经改变
  //   onAddressUpdate(address)
  //   // setNewStreetAddress('') // 清空输入框
  //   // setNewZipCode('') // 清空输入框
  // }


  return (
    <form >
      <strong>home address</strong><br />
      <input
        name={"street_address"}
        value={address.street_address}
        placeholder={"Street Address"}
        onChange={handleChange}
      />
      <input
        name={"city"}
        value={address.city}
        placeholder={"City"}
        onChange={handleChange}
      />
      <input
        name={"state"}
        value={address.state}
        placeholder={"State"}
        onChange={handleChange}
      />
      <input
        name={"zip_code"}
        value={address.zip_code}
        placeholder={"Zipcode"}
        onChange={handleChange}
      />
    </form>
  )


}

export default Address