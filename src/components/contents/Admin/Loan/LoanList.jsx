import React, { Component } from 'react'
import LoanService from '../../../../services/LoanService'
import summaryService from '../../../../services/summaryService'
import LoanSummaryCard from './LoanSummaryCard'
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default class LoanList extends Component {
    state = {
        loans: [],
        getLoan: true,
        getSummary: true
    }
    loanService = new LoanService();
    summaryService = new summaryService();

    UNSAFE_componentWillMount() {
        this.fetchLoans()
        this.fetchSummary()
    }

    fetchLoans() {
        if (this.state.getLoan) {
            this.loanService.getLoanDetails()
                .then(response => {

                    if (this.props.userLocation.toLowerCase() === "peru") {
                        response = response.filter(e => {
                            return e._borrower.country.toLowerCase() === "peru"
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

    fetchSummary() {
        if (this.state.getSummary) {
            let { userLocation } = this.props
            this.summaryService.totals(userLocation)
                .then(response => {
                    this.setState({
                        getSummary: false,
                        data: response
                    })

                })
                .catch(err => {
                    this.setState({
                        data: false
                    })
                })
        }
    }



    render() {

        const { loans, data } = this.state

        return (
            <div className="content">
                <h4>LISTADO DE PRESTAMOS</h4>
                {(loans.length > 0 && data) ? <LoanSummaryCard data={loans} totalPortfolio={data[0][0].totalCapitalRemaining} /> : ""}
            </div>
        )
    }
}