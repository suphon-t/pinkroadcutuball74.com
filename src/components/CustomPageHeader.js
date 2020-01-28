import styled from "styled-components"
import { PageHeader } from "antd"

export default styled(PageHeader)`
  @media (max-width: 576px) {
    .ant-page-header-heading-extra {
      display: unset;
      float: right;
      width: unset;
      padding-top: unset;
      overflow: unset;
    }
  }
`
