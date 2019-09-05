import React, { Component } from 'react'
import summaryService from '../../../../../services/summaryService'
import { Line } from "react-chartjs-2" 
import './graphs.scss'

export default class LoanList extends Component {
    state = {
        getSummary: true,
    }
    summaryService = new summaryService();

    UNSAFE_componentWillMount() {

        this.fetchSummary()
    }

    fetchSummary() {
        if (this.state.getSummary) {
            this.summaryService.portfolioAggregates()
                .then(response => {
                    let { 
                        dates, 
                        InterestProjectedIncome, 
                        InterestActualIncome,
                        PrincipalActualRepayment,
                        PrincipalProjectedRepayment,
                        PrincipalProjectedOutstanding,
                        cumulativeActualIncome,
                        cumulativeProjectedIncome
                        } = response


                    let Interest = 'Intereses'
                    let InterestAcum = 'Intereses Acumulados'
                    let Capital = 'Capital'
                    let CapitalAcum = 'Capital Acumulado'
                    let interestData = this.lineData(dates, Interest, [InterestProjectedIncome, InterestActualIncome])
                    let capitalData = this.lineData(dates, InterestAcum, [PrincipalActualRepayment, PrincipalProjectedRepayment ])
                    let cumulativeInterestData = this.lineData(dates, Capital, [cumulativeActualIncome, cumulativeProjectedIncome])
                    let principalProjectedOutstanding = this.lineData(dates, CapitalAcum, [PrincipalProjectedOutstanding])

                    

                    this.setState({
                        getSummary: false,
                        interestData: interestData,
                        capitalData: capitalData,
                        cumulativeInterestData: cumulativeInterestData,
                        principalProjectedOutstanding: principalProjectedOutstanding
                    })

                })
                .catch(err => {
                    this.setState({
                        data: false
                    })
                })
        }
    }

    lineData = (Dates, title, array) => {
        let data = {
                labels: Dates.values,
                datasets: array.map( e => 
                ({
                    label: e.text,
                    fill: false,
                    backgroundColor: e.color,
                    borderColor: e.color,
                    pointBorderColor: e.color,
                    pointRadius: 4,
                    data: e.values
                }))
          }
    
        return data
        
    }



    render() {
        let {interestData, capitalData, cumulativeInterestData, principalProjectedOutstanding } = this.state
        return (
            <div className="content">
                <div className="graph-holder">
                    <div className="graph-portfolio">
                    <p>INTERES - 6m </p>
                        {interestData && <Line data={interestData}/>}
                    </div>
                    <div className="graph-portfolio">
                    <p>INTERESES ACUMULADOS HISTORICO - 6m </p>
                        {cumulativeInterestData && <Line data={cumulativeInterestData}/>}
                    </div>
                </div>
                <div className="graph-holder">
                    <div className="graph-portfolio">
                    <p>CAPITAL - 6m </p>
                        {capitalData && <Line data={capitalData}/>}
                    </div>
                    <div className="graph-portfolio">
                    <p>CAPITAL COLOCADO- 6m </p>
                        {principalProjectedOutstanding && <Line data={principalProjectedOutstanding}/>}
                    </div>
                </div>
            </div>
        )
    }
}
