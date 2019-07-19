import React from 'react'

export  const UserDetail = (props) => {
    let {detail, value} = props
    return (
        <div className="user-detail">
            <div className="detail-key"><p>{detail.toUpperCase()}: </p></div>
            <div className="detail-value"><p>{value}</p></div>
        </div>
    )
}