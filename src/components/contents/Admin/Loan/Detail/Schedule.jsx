import React from 'react';
import ScheduleHeader from './ScheduleHeader'
import ScheduleBody from './ScheduleBody'
import './Schedule.scss'

function Schedule(props) {

    const { loanSchedule, reversePayment, deletePayments, capitalRemaining, togglePaymentOption } = props;

    let scheduleDetails = {
        loanSchedule, reversePayment, deletePayments, capitalRemaining, togglePaymentOption
    }
    return (
        <div className="loan-schedule-detail-holder">
            <ScheduleHeader />
            <ScheduleBody scheduleDetails={scheduleDetails} />
        </div >
    );
}

export default Schedule;