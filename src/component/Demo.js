import React from "react"
import { Button } from "@material-ui/core"

export default function Demo() {
  const [state, setState] = React.useState({
    count: 0
  })
  const { count } = state
  const handleClickAdd = e => {
    setState({
      count: count + 1
    })
  }
  const handleClickSub = e => {
    setState({
      count: count - 1
    })
  }

  return (
    <React.Fragment>
      <div>Count: {count}</div>
      <Button variant="contained" color="primary" onClick={handleClickAdd}>
        +
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickSub}>
        -
      </Button>
    </React.Fragment>
  )
}
