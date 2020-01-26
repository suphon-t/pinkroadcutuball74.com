import React from "react"
import styled from "styled-components"
import { List, Card, Typography, Button } from "antd"

import FullScreenLoading from "../../components/FullScreenLoading"
import Layout from "./Layout"
import vars from "../../styles/vars"
import SafeArea from "../../components/SafeArea"
import { formatQueueNumber } from "../../utils"

const { Title } = Typography

const TopPanel = styled.div`
  margin: 24px 0;
`

function RandomControl({ data, loading, randomAgain }) {
  return (
    <Layout>
      { data === undefined ? <FullScreenLoading color={vars.pink} /> : (
        <SafeArea all>
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
              xl: 6,
              xxl: 3,
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
        </SafeArea>
      ) }
    </Layout>
  )
}

export default RandomControl
