import React from "react"

import { Link } from "react-router-dom"
import { Button } from "antd"

function Landing() {
  return <div>
    <h1>CUTUBALL</h1>
    <Link to="/register"><Button type="primary">Register</Button></Link>
  </div>
}

export default Landing
