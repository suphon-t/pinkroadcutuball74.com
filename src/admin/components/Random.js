import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"
import { useTranslation } from "react-i18next"

const Container = styled.div`
  display: flex;

  background: linear-gradient(209.11deg, #F9C455 21.96%, #EE7398 89.62%);
`

const Left = styled.div`
  display: flex;
  flex-grow: 1;

  flex-direction: column;
  justify-content: center;
`

const Result = styled.svg`
  .title {
    font-weight: 300;
    font-size: 72px;
  }

  .number {
    font-weight: bold;
    font-size: 288px;
  }
`

const Right = styled.div`
  width: 320px;

  background: ${vars.white};
`

const PreviousTitle = styled.label`
  display: block;
  margin-top: 56px;

  color: ${vars.pink};
  text-align: center;
  font-weight: 300;
  font-size: 48px;
`

const TitleLine = styled.div`
  width: 211px;
  height: 1px;
  margin: 4px auto 0 auto;

  background: ${vars.pink};
`

const PreviousResults = styled.p`
  margin-top: 32px;

  color: ${vars.pink};
  text-align: center;
  font-weight: bold;
  font-size: 64px;
  line-height: 128px;
`

function Random({ className, current, previous }) {
  const { t } = useTranslation()
  return (
    <Container className={className}>
      <Left>
        <Result viewBox="0 0 1210 1024" fill={vars.white}>
          <rect x="135" y="315" width="5" height="328" />
          <text x="200" y="390" className="title">{t('random.current')}</text>
          <text x="200" y="638" className="number">{current}</text>
        </Result>
      </Left>
      <Right>
        <PreviousTitle>{t('random.previous')}</PreviousTitle>
        <TitleLine />
        <PreviousResults>
          {previous.map(item => (
            <span key={item}>
              {item}
              <br />
            </span>
          ))}
        </PreviousResults>
      </Right>
    </Container>
  )
}

export default Random
