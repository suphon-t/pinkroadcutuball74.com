import styled from "styled-components"
import { Modal } from "antd"
import { down } from "styled-breakpoints"

const maskStyle = {
  backgroundColor: "rgba(51, 51, 51, 0.5)",
  WebkitBackdropFilter: "saturate(180%) blur(15px)",
  backdropFilter: "saturate(180%) blur(15px)",
}

export default styled(Modal).attrs({ maskStyle })`
  .ant-modal-content {
    margin: 0 20px;
    border-radius: 10px;

    ${down("xs")} {
      margin: 15;
    }
  }
`
