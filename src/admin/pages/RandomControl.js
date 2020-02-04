import React from "react"
import styled from "styled-components"
import { List, Card, Typography, Button } from "antd"

import FullScreenLoading from "../../components/FullScreenLoading"
import vars from "../../styles/vars"
import { formatQueueNumber } from "../../utils"

const { Title } = Typography

const TopPanel = styled.div`
  margin: 24px 0;
`

function RandomControl({ data, loading, randomAgain }) {
  return data === undefined ? <FullScreenLoading color={vars.pink} /> : (
    <>
      <TopPanel>
        <Button type="primary" shape="round" size="large" onClick={randomAgain} loading={loading}>Random again</Button>
      </TopPanel>
      <Title>Previous entries</Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card>
              <List.Item.Meta
                title={formatQueueNumber(item.number)}
                description={item.name}
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}

export default RandomControl
