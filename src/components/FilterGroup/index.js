import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const FilterGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props

    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          data-testid="searchButton"
          onClick={getJobs}
        >
          T<BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props

    return (
      <div className="employment-type-container">
        <ul className="employee-type-list-container">
          {employmentTypesList.map(eachItem => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="item"
                key={eachItem.EmploymentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  className="check-box"
                  id={eachItem.EmploymentTypeId}
                  value={eachItem.EmploymentTypeId}
                />
                <label
                  className="check-label"
                  htmlFor={eachItem.EmploymentTypeId}
                >
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachItem => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachItem.salaryRangeId)
            }
            return (
              <li
                className="item"
                key={eachItem.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  className="check-input"
                  id={eachItem.salaryRangeId}
                  value={eachItem.salaryRangeId}
                  name="salary"
                />
                <label htmlFor={eachItem.salaryRangeId} className="check-label">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      <ProfileDetails />
      <hr />
      {renderSearchInput()}
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
