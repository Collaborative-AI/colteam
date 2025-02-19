import React, { Component, useState, useContext } from 'react'
import SearchBar from './searchbar.component'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from './AuthProvider.component'

function Navbar() {
  const { auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          ColAI
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* {this.props.pathname === "/data" ? <SearchBar /> : null} */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id=" navbarToggler">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={'/data'}>
                Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/team'}>
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/project'}>
                Project
              </Link>
            </li>
            {auth.success ? (
              <li className="nav-item">
                <Link className="nav-link" to={'/profile'}>
                  Profile
                </Link>
              </li>
            ) : (
              <>
                < li className="nav-item">
                  <Link className="nav-link" to={'/log-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </>)}
          </ul>
        </div>
      </div>
    </nav >
  )
}

// const NavbarWithLocation = props => {
//   const location = useLocation()
//   return <Navbar {...props} pathname={location.pathname} />
// }

export default Navbar
// WithLocation