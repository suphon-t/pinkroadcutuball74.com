import React from "react"

import Random from "../components/Random"
import styled from "styled-components"

const results = ['0042', '0150', '1218', '0003', '1743', '0521', '0026']

const FullScreenRandom = styled(Random)`
  width: 100vw;
  height: 100vh;
`

function RandomScreen() {
  const [current, ...previous] = results
  return <FullScreenRandom current={current} previous={previous} />
}

export default RandomScreen
