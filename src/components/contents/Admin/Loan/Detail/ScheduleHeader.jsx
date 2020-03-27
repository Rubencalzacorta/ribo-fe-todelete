import React from 'react';
import './Schedule.scss'

function ScheduleHeader() {

    return (
        <div className="loan-schedule-head ">
            <div className="detail-schedule head-date">
                <p className='title-date'>FECHA</p>
            </div>
            <div className="detail-schedule head-content-status">
                <p className='title'>ESTATUS</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>INT</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>CAP</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>CUOTA</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>INT/P</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>CAP/P</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>TOTAL</p>
            </div>
            <div className="detail-schedule center head-content">
                <p className='title'>CUENTA</p>
            </div>
            <div className="detail-schedule last head-content">
                <p className='title'>OPCIONES</p>
            </div>
        </div>
    )
}

export default ScheduleHeader;