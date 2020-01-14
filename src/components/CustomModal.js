import styled from "styled-components"
import { Modal } from "antd"
import { down } from "styled-breakpoints"

const maskStyle = {
  backgroundColor: "rgba(51, 51, 51, 0.5)",
  "-webkit-backdrop-filter": "saturate(180%) blur(15px)",
  "backdrop-filter": "saturate(180%) blur(15px)"
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
