import React, { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { Input, Icon } from "antd"
import styled from "styled-components"

import CustomModal from "./CustomModal"
import vars from "../styles/vars"
import { useTranslation } from "react-i18next"

const Box = styled.div`
  display: inline-block;
  width: 100%;
  height: 28px;

  border: 1px solid rgba(25, 33, 52, 0.2);
  border-radius: 2px;
  cursor: pointer;
  transition: all ${vars.transitionLength};

  &:hover {
    border-color: ${vars.highlighted}
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(238, 115, 152, 0.2);
  }

  .has-feedback & {
    padding-right: 30px;
  }

  .has-error & {
    border-color: ${vars.error}
  }
`

const Value = styled.span`
  margin: 0 12px;

  color: ${vars.inputColor};
  line-height: 26px;
  user-select: none;
`

const Placeholder = styled(Value)`
  color: ${vars.grey2};
`

const Container = styled.div`
  height: calc(100vh - 200px);
`

const Scroller = styled.div`
  height: calc(100% - 52px);
  margin-top: 20px;

  overflow-y: scroll;
`

const SearchInput = styled(Input).attrs({
  autoFocus: true,
  prefix: (<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />)
})`
  input {
    border-radius: 0;
  }
`

const Option = styled.p`
  padding: 8px;

  border-bottom: ${vars.grey2} solid 1px;
  color: ${vars.darkBlue};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${vars.lightPink};
  }
`

function DialogSelect({ options, value, onChange, placeholder, ...props }) {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  const labelMap = useMemo(() => {
    const result = {}
    options.forEach(item => {
      result[item.value] = item.label
    })
    return result
  }, [options])

  const filtered = useMemo(() => {
    const lowered = query.toLowerCase()
    return options.filter(item => {
      return item.label.toLowerCase().indexOf(lowered) >= 0 || item.value.toLowerCase().indexOf(lowered) >= 0
    })
  }, [options, query])

  const handleQueryChange = useCallback(e => {
    setQuery(e.target.value)
  }, [])

  const openModal = useCallback(() => {
    setModalVisible(true)
  }, [])
  const closeModal = useCallback(() => {
    setModalVisible(false)
    setQuery('')
  }, [])

  useEffect(() => {
    if (modalVisible) {
      searchRef.current && searchRef.current.input.focus()
    }
  }, [modalVisible])
  
  const handleSelect = useCallback(newValue => {
    onChange(newValue)
    closeModal()
  }, [onChange, closeModal])

  return (
    <>
      <Box onClick={openModal} {...props}>
        { value ? <Value>{ labelMap[value] || value }</Value> : <Placeholder>{placeholder}</Placeholder> }
      </Box>
      <CustomModal visible={modalVisible} onCancel={closeModal}>
        <Container>
          <SearchInput ref={searchRef} value={query} onChange={handleQueryChange} placeholder={t('facultySearch')} />
          <Scroller>
            {filtered.map(item => {
              return (
                <Option key={item.value} onClick={() => handleSelect(item.value)}>{item.label}</Option>
              )
            })}
          </Scroller>
        </Container>
      </CustomModal>
    </>
  )
}

export default DialogSelect
