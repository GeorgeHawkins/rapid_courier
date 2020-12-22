import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import Logo from './Icons/Logo.svg';
import LoginForm from './Components/LoginForm.js';
import Jobs from './Components/Jobs.js'
import UserStore from './Stores/UserStore.js'

class App extends Component {

  render () {

    if (!UserStore.isLoggedIn) {
      return (
        <div className='Main'>
        {/* Screen 1 - Shown before login*/}
          <div className='Header'>
            <img src={Logo} alt='Rapid Courier Logo' className='Logo'/>
            <span>Rapid Courier</span>
          </div>
    
          <LoginForm/>
        </div>
      );
    }

    else {
      return (
        <div className='Main'>
        {/* Screen 2 - Shown after login*/}
          <div className='HeaderBar'>
            <img src={Logo} alt='Rapid Courier Logo' className='Logo'/>
            <span>Rapid Courier</span>
          </div>
    
          <Jobs/>
        </div>
      );
    }

  }
  
}

export default observer(App);