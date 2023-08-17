import React, { Component } from 'react'
export default class SearchBar extends Component {

  render () {
    return (
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search projects"
          name="search"
        />
      </div>
    )
  }
}