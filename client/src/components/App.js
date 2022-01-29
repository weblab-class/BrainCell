import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from './NavBar.js'
import Overview from './Overview.js'
import LiveClass from './LiveClass.js'
import LoginPage from './LoginPage.js'
import Profile from './Profile.js'

import "../utilities.css";
import './App.css'

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";


const App = () => {

  const [userId, setUserId] = useState(undefined);
  const [user, setUser] = useState(undefined)
  const [profileVisible, setProfileVisible] = useState(false)

  const viewProfile = () => {
    profileVisible ? (
      setProfileVisible(false)
    ) : (
      setProfileVisible(true)
    )
  }

  const hideProfile = () => {
    if(profileVisible){
      setProfileVisible(false)
    }
  }

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUser(user);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUser(user)
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUser(undefined);
    post("/api/logout");
  };

  if (userId){
    return (
      <div onClick={hideProfile}>
        <NavBar viewProfile={viewProfile} />
        {profileVisible ? (
          <div className="profile-container">
            <div className="profile">
              <Profile logout={handleLogout} name={user.name} email={user.email}/>
            </div>
          </div>
        ) : (null)}

        <Router>
          <Overview path='/' userId={userId}/>
          <LiveClass path='/liveclass' userId={userId}/>
          <NotFound default />
        </Router>
      </div>
    )}
  else{
    return (
      <LoginPage login={handleLogin}/>
    )
  }
};

export default App;
