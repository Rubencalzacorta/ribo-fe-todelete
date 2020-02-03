import React, { Component } from 'react'
import LoanService from '../../../../services/LoanService'
import WeeklyScheduleTable from './WeeklyScheduleTable'
import moment from 'moment'

export default class PeriodList extends Component {
  state = {
    loans: [],
    getLoan: true,
    startDate: moment().startOf('month').toISOString().substring(0, 10),
    endDate: moment().endOf('month').toISOString().substring(0, 10),
    country: 'Todos',
    countries: ['Todos', 'Venezuela', 'Peru', 'Dominican_Republic']
  }
  service = new LoanService();


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }


  componentDidMount = () => {
    this.fetchLoans()
  }

  fetchLoans(e) {
    if (e) { e.preventDefault(e) }
    const { startDate, endDate } = this.state
    const { userLocation } = this.props
    this.service.getPeriodSchedule(startDate, endDate, userLocation)
      .then(response => {
        this.setState({
          getLoan: false,
          loans: response
        })

      })
      .catch(err => {
        this.setState({
          loans: false
        })
      })
  }




  render() {
    const { country, loans } = this.state;

    const filteredLoans = loans.filter(e => ((country !== 'Todos') ? e.borrower[0].country.includes(country.toUpperCase()) : e))

    return (
      <div className="content">
        <div className="form-row input-row-aligner">
          <div className="form-group col-md-2">
            <label>Fecha Inicial</label>
            <input type="date" className="form-control" id="startDate" name="startDate" value={this.state.startDate} onChange={e => this.handleChange(e)} required />
          </div>
          <div className="form-group col-md-2">
            <label>Fecha Final</label>
            <input type="date" className="form-control" id="endDate" name="endDate" value={this.state.endDate} onChange={e => this.handleChange(e)} required />
          </div>
          <div className="form-group col-md-1 ">
            <button className="btn btn-info" type="button" onClick={e => this.fetchLoans(e)}>Buscar</button>
          </div>
          {(this.props.userLocation === "GLOBAL") ?
            <div className="form-group col-md-2 ">
              <label>País</label>
              <select className="form-control" name="country" id="country" value={this.state.country} onChange={e => this.handleChange(e)}>
                {(this.state.countries) ? this.state.countries.map((e, i) => <option key={i} value={e}>{e}</option>) : ""}
              </select>
            </div> : ""}
        </div>
        <WeeklyScheduleTable data={filteredLoans} />
      </div>
    )
  }
}