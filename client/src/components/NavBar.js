import React from 'react'
import { Link } from '@reach/router'

import logo from '../public/images/logo.png';


import './NavBar.css'

const NavBar = (props) => {

    const handleClick = () => {
        props.viewProfile()
    }

    return (
        <nav className='NavBar-container'>
            <div className='NavBar-link' style={{padding: '8px 0px 0px'}}>
                <Link to='/'>
                    <img src={logo} className='NavBar-logo'/>
                </Link>
            </div>

            <div className='NavBar-linkContainer'>
                <Link to='/' className='NavBar-link u-bold'>
                    Overview
                </Link>
                <Link to='/liveclass' className='NavBar-link u-bold'>
                    Live Class
                </Link>
            </div>
            
            <div className='NavBar-profile' onClick={handleClick}>
                Profile
            </div>
        </nav>
    )
}

export default NavBar