import React from 'react'

import './LoginPage.css'

import img from '../public/images/MIT_img.jpg';

import GoogleLogin from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lth98utc4vhae0oqu44dtntfu5ldhk82.apps.googleusercontent.com";

const LoginPage = (props) => {

    return (
    <div className='bckg' style={{backgroundImage: `url(${img})`}}>
        <div className='login-box'>
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