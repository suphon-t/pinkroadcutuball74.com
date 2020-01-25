import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

import { up } from "styled-breakpoints"
import { Icon } from "antd"

const transitionLength = '.2s'

const Card = styled.div.attrs(({ active }) => ({
  className: active && 'active',
}))`
  position: relative;
  display: block;
  margin: 0 40px;
  padding: 20px 36px 28px 36px;
  
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: ${vars.white};
  text-align: center;
  transition: box-shadow ${transitionLength};
  
  &:not(.active) {
    cursor: pointer;
    color: ${vars.darkBlue};
    box-shadow: 0px 1.6px 4px rgba(0, 0, 0, 0.25);

    &:hover {
      box-shadow: 0px 2.4px 6px rgba(0, 0, 0, 0.25);
    }
  }

  ${up("md")} {
    width: 300px;
  }

  ${up("xl")} {
    padding: 37px 40px 40px 40px;
  }

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    z-index: -1;
    transition: opacity ${transitionLength} linear;
    opacity: 0;
  }

  &.active::before {
    opacity: 1;
  }
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: ${vars.darkBlue};
  transition: color ${transitionLength} linear;
  
  ${Card}.active > & {
    color: ${vars.white};
  }
`

const Number = styled.p`
  margin-top:15px;
  font-size: 24px;
  font-weight: normal;
  color: ${vars.darkBlue};
  transition: color ${transitionLength} linear;
  
  ${Card}.active > & {
    color: ${vars.white};
  }
  
`

function EnterNumber({ title, count, active, ...props }) {
  const { t } = useTranslation()
  return (
    <Card active={active} {...props}>
      <Title>{title}</Title>
      <Number>
        { count ? `${count} ${t('admin.person')}` : (
          <Icon type="loading" spin />
        )}
      </Number>
    </Card>
  )
}

export default EnterNumber