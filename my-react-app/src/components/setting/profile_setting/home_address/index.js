import React, { useEffect } from 'react'
import { useState } from 'react'
// function Address ({ onAddressUpdate }) {
function Address (props) {
  const { onAddressUpdate, home_address1 } = props

  const home_address = { street_address: 'bbb', city: '', state: '', zip_code: '' }
  console.log("home_address1")
  console.log(home_address1)
  console.log("home_address")
  console.log(home_address)
  // console.log("here is address from parent")
  // console.log({ home_address })
  // console.log({ home_address }.home_address)
  // console.log(home_address.street_address)
  const [address, setAddress] = useState(
    {
      ...home_address1,
      // street_address: home_address.street_address,
      // city: '',
      // state: '',
      // zip_code: ''
    }
  )

  useEffect(() => {
    setAddress({ ...home_address1 })
  }, [home_address1])

  // console.log(address)
  const handleChange = (event) => {
    // event.preventDefault()
    console.log("here is address")
    // console.log(event.target.name)
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    })
    onAddressUpdate({
      ...address,
      [event.target.name]: event.target.value
    })
    // console.log(address)
  }


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