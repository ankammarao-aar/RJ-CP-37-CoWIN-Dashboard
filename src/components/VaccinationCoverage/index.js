// Write your code here
import {BarChart, Bar, Legend, XAxis, YAxis} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationData} = props

  return (
    <div className="vaccination-coverage-container">
      <h1 className="coverage-head">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={last7DaysVaccinationData}
        margin={{top: 5}}
      >
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis tick={{stroke: 'gray', strokeWidth: 0}} />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
