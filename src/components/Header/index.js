import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onclickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logos"
        />
      </Link>
      <ul className="header-list">
        <li className="item">
          <Link to="/" className="item-link">
            Home
          </Link>
        </li>
        <li className="item">
          <Link to="/jobs" className="item-link">
            Jobs
          </Link>
        </li>
        <li>
          <button type="button" className="logout-btn " onClick={onclickLogout}>
            Logout
          </button>
        </li>
      </ul>
      <button type="button" className="logout-btn" onClick={onclickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
