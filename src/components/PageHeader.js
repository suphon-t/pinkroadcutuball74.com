import React from "react"

import Title from "./Title"
import Subtitle from "./Subtitle"

function PageHeader({ className, title, subtitle }) {
  return (
    <div className={className}>
      <Title children={title} />
      <Subtitle children={subtitle} />
    </div>
  )
}

export default PageHeader
