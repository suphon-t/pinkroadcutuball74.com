import React, { useEffect, useState, useCallback } from "react"
import { notification } from "antd"

import RandomControl from "./RandomControl"
import { useGet } from "../../api"
import CustomModal from "../../components/CustomModal"
import { formatQueueNumber } from "../../utils"
import styled from "styled-components"

function RandomRemote() {
  const { data, execute: refresh } = useGet('/admin/randomhistory')
  const { data: randomResult, error: randomError, loading, execute: random } = useGet('/admin/random', {}, false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (randomResult?.data) {
      refresh()
      setModalVisible(true)
    }
  }, [randomResult, refresh])

  useEffect(() => {
    if (randomError) {
      notification['error']({
        message: 'Random failed',
        description: randomError?.response?.data?.error_description || JSON.stringify(randomError),
      })
    }
  }, [randomError])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <>
      <RandomControl data={data?.data} loading={loading} randomAgain={random} />
      <ResultModal data={randomResult?.data} visible={modalVisible} onCancel={closeModal} />
    </>
  )
}

const Number = styled.h1`
  font-size: 96px;
  font-weight: 600;
  text-align: center;
`

const Name = styled.h2`
  font-size: 36px;
  text-align: center;
`

function ResultModal({ data, ...props }) {
  return (
    <CustomModal {...props}>
      <Number>{formatQueueNumber(data?.number)}</Number>
      <Name>{data?.name}</Name>
    </CustomModal>
  )
}

export default RandomRemote
