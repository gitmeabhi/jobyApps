import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,

    rating: eachItem.rating,
    title: eachItem.title,
  })

  getFormattedData = eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    companyWebsiteUrl: eachItem.company_website_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    lifeAtCompany: {
      description: eachItem.life_at_company.description,
      imageUrl: eachItem.life_at_company.image_url,
    },
    location: eachItem.location,
    packagePerAnnum: eachItem.package_per_annum,
    rating: eachItem.rating,
    skills: eachItem.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: eachItem.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachItem =>
        this.getFormattedSimilarData(eachItem),
      )

      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-heading">Oops! Something Went Wrong</h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        id="button"
        className="job-item-btn"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-details">
        <div className="job-item">
          <div className="logo-title-location">
            <div className="logo-title">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="comapny-logo "
              />
              <div className="title-rating">
                <h1 className="title-head">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon " />
                  <p className="rating-head">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package">
              <div className="location-emp">
                <div className="location-cont">
                  <MdLocationOn className="location-icon" />
                  <p className="loc-head">{location}</p>
                </div>
                <div className="employee-type">
                  <BsFillBriefcaseFill />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="desc-visit">
            <h1>Description</h1>
            <div className="visit-cont">
              <a href={companyWebsiteUrl} className="visit-head">
                Visit
              </a>
              <BiLinkExternal />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul>
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" className="life-at" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
