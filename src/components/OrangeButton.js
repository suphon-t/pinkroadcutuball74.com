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
  color: ${vars.darkBlue};

  font-weight: 500;
  font-size: 18px;
  line-height: 18px;

  cursor: pointer;
  outline: none;
  transition: all ${vars.transitionLength};

  &:disabled {
    cursor: initial;
    opacity: ${vars.disabledOpacity};
  }

  &:not(:disabled) {
    box-shadow: 0px 4px 30px ${vars.grey2};

    &:hover,
    &:focus {
      background: ${hoverColor};
      box-shadow: 0px 4px 30px ${hoverColor};
    }

    &:active {
      background: ${darken(.1, vars.orange)};
    }
  }
`
