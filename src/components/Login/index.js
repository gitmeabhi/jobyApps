import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, erroMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.vlue})
  }

  onChangePassword = event => {
    this.setState({password: event.target.vlue})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = erroMsg => {
    this.setState({erroMsg, showSubmitError: true})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, erroMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logo"
          />
          <form className="login-form" onSubmit={this.onClickSubmit}>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="submit-btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{erroMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
