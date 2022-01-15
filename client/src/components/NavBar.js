import React from 'react'
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from '@reach/router'

import './NavBar.css'

const GOOGLE_CLIENT_ID = "40738148267-lmp4m2pr4rbedjcvu0au6qqhvva01g7p.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
    return (
        <nav className='NavBar-container'>
            <h1 className='NavBar-logo'>LOGO</h1>
            {/* <div className='NavBar-linkContainer'>
                <Link to='/' className='NavBar-link u-bold'>
                    Overview
                </Link>
                <Link to='/calendar' className='NavBar-link u-bold'>
                    Calendar
                </Link>
                <Link to='/liveclass' className='NavBar-link u-bold'>
                    Live Class
                </Link>
            </div> */}
            <div className='NavBar-loginButtonContainer'>
                <div className='NavBar-loginButton'>
                    {userId ? (
                        <GoogleLogout
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={handleLogout}
                            onFailure={(err) => console.log(err)}
                        />
                        ) : (
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={handleLogin}
                            onFailure={(err) => console.log(err)}
                        />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar