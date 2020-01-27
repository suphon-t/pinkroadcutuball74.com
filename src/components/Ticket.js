import React from "react"
import styled from "styled-components"

import { formatQueueNumber } from "../utils"

const Container = styled.div`
  display: flex;
  position: relative;

  background: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const Overlay = styled.svg`
  width: 100%;
  height: 100%;

  .title {
    font-family: 'Gotham Thin';
    font-size: 56.4296px;
  }

  .queue-number {
    font-family: 'Gotham Ultra';
    font-size: 140.5601px;
  }

  .name {
    font-size: 31px;
  }
`

function Ticket({ data, background, ...rest }) {
  const { number, name } = data
  return (
    <Container background={background} {...rest}>
      <Overlay viewBox='0 0 910 1214'>
        <text x="50%" y="430.7996" textAnchor="middle" className="title">Queue Number</text>
        <text x="50%" y="605" textAnchor="middle" className="queue-number">{formatQueueNumber(number)}</text>
        <text x="50%" y="655" textAnchor="middle" className="name">{name}</text>
      </Overlay>
    </Container>
  )
}

export default Ticket
