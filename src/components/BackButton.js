import styled from "styled-components"
import OrangeButton from "./OrangeButton"
import { down } from "styled-breakpoints"

const BackButton = styled(OrangeButton)`
  margin: 34px auto 0 auto;
  background: #E0E0E0;
  box-shadow: 0px 4px 30px rgba(25, 33, 52, 0.2);
  border-radius: 79px;
  border: 1px solid #E0E0E0;
  ${down("lg")} {
    display: none;
  }
`

export default BackButton
