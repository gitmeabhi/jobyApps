import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-item">
      <div className="logo-tilte-location">
        <div className="logo-title">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating">
            <h1>{title}</h1>
            <div className="rating-icon">
              <BsStarFill />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="location-employee">
          <div className="location-cont">
            <p>{location}</p>
          </div>
          <div className="employee-cont">
            <BsFillBriefcaseFill />
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
