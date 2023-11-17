// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationData: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getVaccination()
  }

  getVaccination = async () => {
    this.setState({apiStatus: statusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updateLast7DaysVaccinationData = data.last_7_days_vaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const updateVaccinationByAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      const updateVaccinationByGender = data.vaccination_by_gender.map(
        each => ({
          count: each.count,
          gender: each.gender,
        }),
      )
      this.setState({
        last7DaysVaccinationData: updateLast7DaysVaccinationData,
        vaccinationByGender: updateVaccinationByGender,
        vaccinationByAge: updateVaccinationByAge,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  renderChatView = () => {
    const {
      last7DaysVaccinationData,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state

    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinationData={last7DaysVaccinationData}
        />

        <VaccinationByGender vaccinationByGender={vaccinationByGender} />

        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSwitchView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case statusConstants.success:
        return this.renderChatView()
      case statusConstants.failure:
        return this.renderFailureView()
      case statusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="nav-logo"
          />
          <h1 className="nav-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination In India</h1>

        {this.renderSwitchView()}
      </div>
    )
  }
}

export default CowinDashboard
