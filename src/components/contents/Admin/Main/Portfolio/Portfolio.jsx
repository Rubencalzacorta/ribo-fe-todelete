import React, { Component } from 'react'
import summaryService from '../../../../../services/summaryService'
import PortfolioCard from './PortfolioCard'
import PortfolioScheduleCard from './PortfolioScheduleCard'

export default class LoanList extends Component {
    state = {
        getSummary: true
    }
    summaryService = new summaryService();

    UNSAFE_componentWillMount() {

        this.fetchSummary()
    }


    fetchSummary = async () => {
        if (this.state.getSummary) {
            let { userLocation } = this.props
            let scheduleTotal = (userLocation !== 'PERU' ? await this.summaryService.portfolioTotalsByEveryStatus() : null)
            let totals = await this.summaryService.totals(userLocation)
            let monthTotals = await this.summaryService.portfolioMonthStatus()
            Promise.all([totals, scheduleTotal, monthTotals])
            // this.summaryService.totals(userLocation)
                .then(response => {
                    this.setState({
                        getSummary: false,
                        data: response[0],
                        scheduleData: response[1],
                        monthData: response[2]
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

        const { data, scheduleData, monthData } = this.state

        return (
            <div className="content">
                {(data && monthData) ? data[0].map( (e, i) => { 
                    return <PortfolioCard key={i} data={e} monthData={monthData.filter( el => el._id === e._id )}/> }) : ""} 
                {scheduleData ?  <PortfolioScheduleCard data={scheduleData}/> : ""}
            </div>
        )
    }
}