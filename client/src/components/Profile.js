import React from 'react'

import ProfileName from './ProfileName.js';

import './Profile.css'

import { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lth98utc4vhae0oqu44dtntfu5ldhk82.apps.googleusercontent.com";

const Profile = (props) => {

    const handleLogout = () => {
        props.logout()
      };

    return (
        <div>
            <ProfileName name={props.name} email={props.email}/>
            <div style={{textAlign: 'center'}}>
                <GoogleLogout 
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="LOG OUT"
                    onLogoutSuccess={handleLogout}
                    onFailure={(err) => console.log(err)}
                />
            </div>
        </div>
    )
}

export default Profile