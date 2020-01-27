import React from "react"
import styled from "styled-components"

import { ReactComponent as TicketOverlay } from "../images/ticket-overlay.svg"
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

  .queue-number {
    font-family: 'Gotham Ultra';
    font-size: 220.72px;
  }

  .name {
    font-size: 54px;
  }
`

function Ticket({ data, background, ...rest }) {
  const { number, name } = data
  return (
    <Container background={background} {...rest}>
      <Overlay viewBox='0 0 910 1214'>
        <TicketOverlay />
        <text x="50%" y="700.61" textAnchor="middle" className="queue-number">{formatQueueNumber(number)}</text>
        <text x="50%" y="790.91" textAnchor="middle" className="name">{name}</text>
      </Overlay>
    </Container>
  )
}

export default Ticket
