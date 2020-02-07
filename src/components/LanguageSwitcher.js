import React from "react"
import styled, { css } from "styled-components"
import { up } from "styled-breakpoints"

import { usePref, LANGUAGE } from "../preferences"
import vars from "../styles/vars"

const Container = styled.div`
  position: relative;
  width: 76px;
  height: 26px;
  padding: 2px 8px;

  background: ${vars.orange};
  border-radius: 12px;
  cursor: pointer;
  user-select: none;

  ${up('xl')} {
    width: 94px;
    height: 32px;
  }

  &::after {
    content: '';

    position: absolute;
    top: 2px;
    left: ${({ isEn }) => isEn ? '2px' : '37px'};
    width: 37px;
    height: 22px;

    background: ${vars.pink};
    box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: all ${vars.transitionLength};

    ${up('xl')} {
      left: ${({ isEn }) => isEn ? '2px' : '46px'};
      width: 46px;
      height: 28px;
    }
  }
`

const LabelContainer = styled.div`
  position: absolute;
  display: flex;
  left: 2px;
  width: calc(100% - 4px);

  flex-direction: row;
  justify-content: center;
  z-index: 1;
`

const Label = styled.div`
  width: 35px;
  height: 22px;

  color: ${vars.grey75};

  font-size: 16px;
  line-height: 24px;
  text-align: center;

  transition: color ${vars.transitionLength};

  ${up('xl')} {
    width: 44px;
    height: 28px;

    font-size: 18px;
    line-height: 30px;
  }

  ${({ active }) => active && css`
    color: ${vars.white};
    font-weight: bold;
  `}
`

function LanguageSwitcher() {
  const [language, setLanguage] = usePref(LANGUAGE)
  const isEn = language === 'en'

  return (
    <Container isEn={isEn} onClick={() => {
      if (isEn) {
        setLanguage('th')
      } else {
        setLanguage('en')
      }
    }}>
      <LabelContainer>
        <Label active={isEn}>EN</Label>
        <Label active={!isEn}>TH</Label>
      </LabelContainer>
    </Container>
  )
}

export default LanguageSwitcher
