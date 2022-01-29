import React from 'react'

import './LoginPage.css'

import bckgImg from '../public/images/MIT_img.jpg';
import logo from '../public/images/logo.png';

import GoogleLogin from "react-google-login";
const GOOGLE_CLIENT_ID = "40738148267-lth98utc4vhae0oqu44dtntfu5ldhk82.apps.googleusercontent.com";

const LoginPage = (props) => {

    return (
    <div className='bckg' style={{backgroundImage: `url(${bckgImg})`}}>
        <div className='login-box'>
            <img src={logo} className='logo'/>
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