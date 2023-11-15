import {Component} from 'react'

import Cookies from 'js-cookie'

import {withRouter, Link} from 'react-router-dom'

import SectionItem from '../SectionItem'

import './header.css'

const sectionOptions = [
  {id: 1, displayText: 'Home', path: '/'},
  {id: 2, displayText: 'Cart', path: '/cart'},
]

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getCurrentPath = () => {
    const {match} = this.props

    const {url} = match
    return url
  }

  render() {
    const currentPath = this.getCurrentPath()

    return (
      <>
        <nav className="header-container">
          <li className="header-sub-container">
            <div className="header-logo-container">
              <Link to="/" className="nav-link">
                <img
                  src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
                  alt=" website logo"
                />
              </Link>

              <h1 className="header-website-heading">Tasty Kitchens</h1>
            </div>
            <div className="sections-container">
              {sectionOptions.map(eachOption => (
                <SectionItem
                  optionDetails={eachOption}
                  key={eachOption.id}
                  isActive={currentPath === eachOption.path}
                />
              ))}

              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </li>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
