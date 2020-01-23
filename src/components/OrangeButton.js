import styled from "styled-components";
import { lighten, darken } from "polished";

import vars from "../styles/vars";

export default styled.button`
  display: block;
  width: 152px;
  padding: 8px 0;

  background: ${({ background }) => background || vars.orange};
  border: 1px solid ${({ background }) => background || vars.orange};
  border-radius: 9999px;
  color: ${({ color }) => color || vars.darkBlue};

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
      background: ${({ background }) => lighten(.05, background || vars.orange)};
      box-shadow: 0px 4px 30px ${({ background }) => lighten(.05, background || vars.orange)};
    }

    &:active {
      background: ${({ background }) => darken(.1, background || vars.orange)};
    }
  }
`
