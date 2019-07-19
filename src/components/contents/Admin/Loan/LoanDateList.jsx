import React, { Component } from 'react'
import LoanService from '../../../services/LoanService'
import WeeklyScheduleTable from './WeeklyScheduleTable'

export default class LoanList extends Component {
    state = {
        loans: [],
        getLoan: true
        
    }
    service = new LoanService();


    fetchLoans() {
        if (this.state.getLoan) {
            this.service.getWeekSchedule()
                .then(response => {

                  if (this.props.location.toLowerCase() === "peru") {
                    response = response.filter( e => {
                        return e._loan._borrower.country.toLowerCase() === "peru"
                    })
                }
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
    }


  render() {
    this.fetchLoans()

    return (
      <div className="content">
        <WeeklyScheduleTable data={this.state.loans}/>
      </div>
    )
  }
}