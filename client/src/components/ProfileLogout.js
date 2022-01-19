import React from 'react'

import './ProfileLogout.css'

import { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lth98utc4vhae0oqu44dtntfu5ldhk82.apps.googleusercontent.com";

const ProfileLogout = (props) => {
    const logout = () => {
        <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.logout}
            onFailure={(err) => console.log(err)}
        />
    }
    return (
        <div>
            <div className='logout' onClick={logout}>LOG OUT</div>
        </div>
    )
}

export default ProfileLogout