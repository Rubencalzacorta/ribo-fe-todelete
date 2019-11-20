import React from 'react'
import './portfolioCategoryItem.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PortfolioDueCategory = (props) => {
    let { data } = props
    return (
        <div className="item-cards">
            <div className="item-content">
                <div className="item-holder">
                    <p className="content">{(data.firstName.split().length >= 1 && data.lastName.split().length >= 1 ? data.firstName.split(" ")[0] + " " + data.lastName.split(" ")[0] : data.firstName + " " + data.lastName).slice(0, 23)}</p>
                </div>
            </div>
            <div className="item-content">
                <div className="item-holder">
                    <p className="content">{(moment(data.date).format('YYYY-MM-DD'))}</p>
                </div>
            </div>
            <div className="item-content">
                <div className="item-holder">
                    <p className="content">{(data.interest).toLocaleString() + " " + data.currency}</p>
                </div>
            </div>
            <div className="item-content">
                <div className="item-holder">
                    <p className="content">{(data.principal).toLocaleString() + " " + data.currency}</p>
                </div>
            </div>
            <div className="item-content">
                <div className="item-holder">
                    <p className="content"><Link to={`/admin/loan/${data._loan}`}>+</Link></p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioDueCategory;