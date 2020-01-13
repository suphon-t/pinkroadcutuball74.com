import React from "react"
import { Link } from "react-router-dom"

import logo from "../images/logo.png"

function ContentCard({ children, ...rest }) {
  return (
    <div>
      <Link to="/" className="logo-small"><img src={logo} /></Link>
      <div className="content-card" {...rest}>
        {children}
      </div>
    </div>
  )
}

export default ContentCard
