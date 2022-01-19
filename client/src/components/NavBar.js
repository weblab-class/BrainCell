import React, { useState } from 'react'
import { Link } from '@reach/router'

// import Profile from './Profile.js'
import logo from '../public/images/logo.png';


import './NavBar.css'

const NavBar = (props) => {
    // const [profileVisible, setProfileVisible] = useState(false)

    const handleClick = () => {
        props.viewProfile()
    }

    return (
        <nav className='NavBar-container'>
            <div className='NavBar-link' style={{padding: '8px 0px 0px'}}>
                <Link to='/'>
                    <img src={logo} style={{width: '100px', borderRadius: '15px'}}/>
                </Link>
            </div>
            <div className='NavBar-linkContainer'>
                <Link to='/' className='NavBar-link u-bold'>
                    Overview
                </Link>
                <Link to='/calendar' className='NavBar-link u-bold'>
                    Calendar
                </Link>
                <Link to='/liveclass' className='NavBar-link u-bold'>
                    Live Class
                </Link>
            </div>
            <div className='NavBar-loginButton'>
            {/* {profileVisible ? (
            <div>
                <div onClick={handleClick}>
                    <Profile logout={props.logout} />
                </div>
            </div>
            ) : ( */}

            <div className='NavBar-profile' onClick={handleClick}>
                Profile
            </div>
            {/* )} */}
            </div>
        </nav>
    )
}

export default NavBar