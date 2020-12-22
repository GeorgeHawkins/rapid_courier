import React, { Component } from 'react'
import SubmitButton from './SubmitButton.js'
import UserStore from '../Stores/UserStore.js'

export class LoginForm extends Component {

  state = {
    username: '',
    password: '',
  }


  onChange = (e) => {
    const val = e.target.value;
    if (val.length > 12) return;
    this.setState({ [e.target.name]: val})
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
    })
  }

  async doCreateAccount() {
    console.log('account made');
  }

  async doLogin() {
    if (!this.state.username || !this.state.password) {
      return;
    }

    try {

      const res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      const result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }

    }

    catch(e) {
      console.log(e);
      this.resetForm();
    }

  }

  render() {
      return (
        <div>
  
          <form className='LoginForm'>
  
          <input 
          type='text' 
          placeholder='Username'
          value={this.state.username}
          name='username' 
          className='InputField'
          autoComplete='off'
          onChange={this.onChange}
          />
  
          <input type='password' 
          placeholder='Password' 
          value={this.state.password}
          name='password' 
          className='InputField' 
          onChange={this.onChange}
          />
  
          <SubmitButton 
          text='SIGN IN'
          disabled={this.state.username < 1 || this.state.password < 1}
          className='SignInButton'
          onClick={ () => this.doLogin() }
          />
  
          </form>


          <div style={{width: "40%", margin: "auto", fontSize: "18px"}}>
            Test Login Users
          

          <div className='TestUsersHeader' style={{borderBottom: "1px solid #ccc"}}>
            <div className='TestUsersText'>Username</div>
            <div className='TestUsersText'>Password</div>
          </div>

          <div className='TestUsersHeader'>
            <div className='TestUsersText'>test user</div>
            <div className='TestUsersText'>12345</div>
          </div>

          <div className='TestUsersHeader'>
            <div className='TestUsersText'>sam123</div>
            <div className='TestUsersText'>password</div>
          </div>

          <div className='TestUsersHeader'>
            <div className='TestUsersText'>icepack88</div>
            <div className='TestUsersText'>sheep1</div>
          </div>
          
          </div>



        </div>

      );
      
  }
  
}

export default LoginForm
