import React from 'react';
import ScheduleHeader from './ScheduleHeader'
import ScheduleBody from './ScheduleBody'
import './Schedule.scss'

function Schedule(props) {

    const { loanSchedule, openPaymentOption, reversePayment, deletePayments } = props;

    let scheduleDetails = {
        loanSchedule, openPaymentOption, reversePayment, deletePayments
    }
    return (
        <div className="loan-schedule-detail-holder">
            <ScheduleHeader />
            <ScheduleBody scheduleDetails={scheduleDetails} />
        </div >
    );
}

export default Schedule;