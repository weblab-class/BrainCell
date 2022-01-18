import React from 'react'

import './LoginPage.css'

import img from '../public/images/MIT_img.jpg';

import GoogleLogin from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lth98utc4vhae0oqu44dtntfu5ldhk82.apps.googleusercontent.com";

const LoginPage = (props) => {

    return (
    <div style={{backgroundImage: `url(${img})`, height: window.innerHeight, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover'}}>
        <div>
            <div className="logo">
                LOGO
            </div>
            <div>
                <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={props.login}
                onFailure={(err) => console.log(err)}
                />
            </div>
        </div>
    </div>
    )
}

export default LoginPage