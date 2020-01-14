import styled from "styled-components";
import { lighten, darken } from "polished";

import vars from "../styles/vars";

const hoverColor = lighten(.05, vars.orange)

export default styled.button`
  display: block;
  width: 152px;
  padding: 8px 0;

  background: ${vars.orange};
  border: 1px solid ${vars.orange};
  border-radius: 9999px;
  box-shadow: 0px 4px 30px ${vars.grey2};
  color: ${vars.darkBlue};

  font-weight: 500;
  font-size: 18px;
  line-height: 18px;

  cursor: pointer;
  outline: none;
  transition: all ${vars.transitionLength};

  &:hover,
  &:focus {
    background: ${hoverColor};
    box-shadow: 0px 4px 30px ${hoverColor};
  }

  &:active {
    background: ${darken(.1, vars.orange)};
  }
`
