import styled from "styled-components";
import { Input } from "antd";
import vars from "../styles/vars";

export default styled(Input)`
  padding: 0;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${vars.darkBlue};
  border-radius: 0;

  &:disabled {
    background-color: transparent;
    border-color: #d9d9d9;
  }

  &:focus {
    box-shadow: 0 2px 0 0 rgba(238, 115, 152, 0.2);
  }

  &::placeholder {
    font-size: 11px;
    line-height: 24px;

    color: $grey4;
  }

  .has-error &:focus {
    box-shadow: 0 2px 0 0 rgba(245, 34, 45, 0.2);
  }
`
