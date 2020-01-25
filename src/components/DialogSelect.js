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

  &:hover, &:focus {
    border-color: ${vars.highlighted}
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(238, 115, 152, 0.2);
    outline: none;
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
  transition: padding-bottom .15s ease-out;
`

const SearchInput = styled(Input).attrs({
  autoFocus: true,
  prefix: (<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />)
})`
  input {
    border-radius: 0;
    font-size: 16px;
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

function DialogSelect({ options, value, onChange, placeholder, keepScroll, ...props }) {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const [offsetBottom, setOffsetBottom] = useState(0)
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const dialogCloseTime = useRef(new Date().getTime())

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
    if (new Date().getTime() - dialogCloseTime.current < 300) return
    setModalVisible(true)
    if (!keepScroll) {
      window.scrollTo(window.scrollX, 0)
    }
  }, [keepScroll])
  const closeModal = useCallback(() => {
    setModalVisible(false)
    setQuery('')
    searchRef.current && searchRef.current.input.blur()
    dialogCloseTime.current = new Date().getTime()
  }, [])

  // Focus search on open
  useEffect(() => {
    if (modalVisible) {
      searchRef.current && searchRef.current.input.focus()
    }
  }, [modalVisible])

  // Adjust for iOS virtual keyboard
  const viewport = window.visualViewport
  useEffect(() => {
    if (!viewport || !modalVisible) {
      return
    }

    const updateOffsetBottom = () => {
      const offsetBottom = window.innerHeight - viewport.height - viewport.offsetTop
      setOffsetBottom(Math.max(0, offsetBottom - 54))
    }
    updateOffsetBottom()
    viewport.addEventListener('resize', updateOffsetBottom)
    return () => {
      setOffsetBottom(0)
      viewport.removeEventListener('resize', updateOffsetBottom)
    }
  }, [viewport, modalVisible])
  
  const handleSelect = useCallback(newValue => {
    onChange(newValue)
    closeModal()
  }, [onChange, closeModal])

  const handleKeyPress = useCallback(e => {
    if (e.key !== "Enter") return

    e.preventDefault()
    if (filtered.length === 1) {
      handleSelect(filtered[0].value)
    }
  }, [filtered, handleSelect])

  return (
    <>
      <Box onClick={openModal} onFocus={openModal} {...props} tabIndex={0}>
        { value ? <Value>{ labelMap[value] || value }</Value> : <Placeholder>{placeholder}</Placeholder> }
      </Box>
      <CustomModal visible={modalVisible} onCancel={closeModal}>
        <Container>
          <SearchInput ref={searchRef} value={query} onChange={handleQueryChange} onKeyPress={handleKeyPress} placeholder={t('facultySearch')} />
          <Scroller style={{ paddingBottom: offsetBottom }}>
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
