import React from "react"

import "../styles/ticket.scss"

function Ticket({ data, ...rest }) {
  const { number, name } = data
  return (
    <div className="ticket" {...rest}>
      <svg viewBox='0 0 910 1214'>
        <text x="50%" y="430.7996" textAnchor="middle" className="title">Queue Number</text>
        <text x="50%" y="605" textAnchor="middle" className="queue-number">{number}</text>
        <text x="50%" y="655" textAnchor="middle" className="name">{name}</text>
      </svg>
    </div>
  )
}

export default Ticket
