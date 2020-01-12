import React from "react"

function ContentCard({ children, ...rest }) {
  return (
    <div>
      <div className="logo-small" />
      <div className="content-card" {...rest}>
        {children}
      </div>
    </div>
  )
}

export default ContentCard
