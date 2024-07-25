import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobsDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="container">
          <div className="logo-name-container">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="name-rating">
              <h1 className="head">{title}</h1>
              <p className="rating">{rating}</p>
            </div>
          </div>
          <div className="locations">
            <div className="both">
              <p className="loc">{location}</p>
              <p className="type">{employmentType}</p>
            </div>

            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="desc">Description</h1>
          <p className="desc-option">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
