import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"

function ContentCard({ children, ...rest }) {
  const history = useHistory()
  const handleClick = useCallback(() => {
    history.push('/')
  }, [history])
  return (
    <div>
      <div className="logo-small" onClick={handleClick} />
      <div className="content-card" {...rest}>
        {children}
      </div>
    </div>
  )
}

export default ContentCard
