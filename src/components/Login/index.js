import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
console.log(smallImageUrl)
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'

console.log(largeImageURl)

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({showError: true, errorMsg: err})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    /* console.log(responseData) */
    if (response.ok === true) {
      this.onSubmitSuccess(responseData.jwt_token)
    } else {
      this.onSubmitFailure(responseData.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="large-device-container">
          <div className="login-form-container">
            <div className="login-form-card">
              <img
                src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
              <form className="login-form" onSubmit={this.onSubmitForm}>
                <label htmlFor="name" className="labels">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  onChange={this.onChangeUserName}
                  value={username}
                />
                <label htmlFor="pass" className="labels">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="pass"
                  className="input-field"
                  onChange={this.onChangePassword}
                  value={password}
                />
                <button className="login-button" type="submit">
                  Login
                </button>
                {showError ? <p className="error-msg">{errorMsg}</p> : ''}
              </form>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
            alt="landing-img"
            className="landing-image"
          />
        </div>
        <div className="small-devices-container">
          <img
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
            alt="landing-img"
            className="small-landing-image"
          />
          <h1 className="small-login-heading">Login</h1>
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="labels">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              onChange={this.onChangeUserName}
              value={username}
            />
            <label htmlFor="password" className="labels">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              onChange={this.onChangePassword}
              value={password}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showError ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </>
    )
  }
}

export default Login
