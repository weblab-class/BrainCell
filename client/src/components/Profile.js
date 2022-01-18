import React from 'react'

import ProfileName from './ProfileName.js';
import ProfileLogout from './ProfileLogout.js';

import './Profile.css'

import { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lmp4m2pr4rbedjcvu0au6qqhvva01g7p.apps.googleusercontent.com";

const Profile = (props) => {

    const handleLogout = () => {
        props.logout()
      };

    return (
        <div>
            <ProfileName />
            {/* <ProfileLogout logout={handleLogout}/> */}
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