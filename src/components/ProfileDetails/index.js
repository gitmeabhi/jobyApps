import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Autherization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatus: apiStatusConstants.success, profileData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-error">
      <button
        type="button"
        id="button"
        className="failure-btn"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader" id="loader">
      <Loader type="ThreeDots" color="#fff" width="50" height="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProfileDetails
