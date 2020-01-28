import React from "react"
import { useCurrentTime } from "../utils"

function CurrentTime({ className, ...props }) {
  const [formatted] = useCurrentTime(props)
  return <span className={className}>{formatted}</span>
}

export default CurrentTime
