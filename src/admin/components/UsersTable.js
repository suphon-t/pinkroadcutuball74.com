import React, { useState, useCallback, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import { darken, lighten } from "polished"
import { useTranslation } from "react-i18next"
import { Table, Pagination, Input, Icon, } from "antd"
import debounce from "lodash.debounce"
import { up, down } from "styled-breakpoints"

import { Up } from "../../styles/breakpoints"
import vars from "../../styles/vars"
import { useWindowDimensions, formatQueueNumber, formatDt } from "../../utils"
import { useGet } from "../../api"
import BlurBehind from "../../components/BlurBehind"
import SafeArea from "../../components/SafeArea"
import EditUserModal from "./EditUserModal"
import Sticky from "../../components/Sticky"
import PrefixIcon from "../../components/PrefixIcon"

const { Column } = Table

const horizontalPadding = css`
  ${up('xl')} {
    margin: 0 64px;
  }
`

const ControlBox = styled.div`
  display: flex;
  padding: 16px 0;

  ${down('sm')} {
    padding: 8px 0;
  }

  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;
  
  ${horizontalPadding}
`

const checkInRowBg = 'rgba(64, 237, 194, 0.18)'

const StyledTable = styled(Table)`
  ${horizontalPadding}

  .ant-table-thead > tr > th {
    background: ${vars.pink};
    color: ${vars.white};

    &.ant-table-column-sort {
      background: ${darken(.05, vars.pink)};
    }

    &.ant-table-column-has-actions.ant-table-column-has-sorters:hover {
      background: ${lighten(.05, vars.pink)}
    }
  }

  .ant-table-row {
    cursor: pointer;
  }

  .checked-in {
    background: ${checkInRowBg};

    &:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
      background: ${darken(.005, checkInRowBg)};
    }
  }
`

const StyledInput = styled(Input)`
  margin-bottom: 8px;

  ${up('md')} {
    margin-bottom: 16px;
  }

  ${up('xl')} {
    width: 250px;
    margin: 0 16px 0 0;
  }
`

const PaginationContainer = styled.div`
  ${down('lg')} {
    display: flex;
    width: 100%;

    justify-content: center;
  }
`

const StickyArea = styled(BlurBehind)`
  background: rgba(255, 255, 255, 0.72);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    background: transparent;
    transition: background-color ${vars.transitionLength};
    
    .stuck > & {
      background: rgba(0, 0, 0, 0.16);
    }
  }
`

function UsersTable({ showCheckedIn }) {
  const { t } = useTranslation()
  const [pageSize, setPageSize] = useState(() => JSON.parse(localStorage.getItem('adminPageSize') || '10'))
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const debounceSetQuery = useMemo(() => debounce(newQuery => {
    setQuery(newQuery)
    setPage(1)
  }, 300), [])
  const { data, loading, execute: fetchUsers } = useGet('/admin/getusers', {
    checkedin: showCheckedIn || undefined,
    start: pageSize * (page - 1),
    end: pageSize * page,
    value: query,
  })

  useEffect(() => {
    setPage(1)
  }, [showCheckedIn])

  const [searchValue, setSearchValue] = useState('')
  const onSearch = useCallback(({ target: { value } }) => {
    setSearchValue(value)
    debounceSetQuery(value)
  }, [debounceSetQuery])

  const onShowSizeChange = useCallback((_, newSize) => {
    const first = pageSize * (page - 1)
    const newPage = first / newSize + 1
    setPage(Math.floor(newPage))
    setPageSize(newSize)
    localStorage.setItem('adminPageSize', JSON.stringify(newSize))
  }, [page, pageSize])

  const users = (data && data.data.users) || []
  const count = (data && data.data.users_count) || 1

  const [editVisible, setEditVisible] = useState(false)
  const [editingRow, setEditingRow] = useState(undefined)

  const closeEdit = useCallback(() => {
    setEditVisible(false)
  }, [])

  const closeEditAndReload = useCallback(() => {
    setEditVisible(false)
    fetchUsers()
  }, [fetchUsers])

  const handleRow = useCallback((_, rowIndex) => ({
    onClick: () => {
      setEditingRow(rowIndex)
      setEditVisible(true)
    }
  }), [])

  const { width } = useWindowDimensions()

  const controls = (
    <ControlBox>
      <StyledInput
        value={searchValue}
        onChange={onSearch}
        placeholder="Search users"
        prefix={<PrefixIcon type="search" />} />
      <PaginationContainer>
        <Pagination 
          simple={width < 576}
          size="small"
          current={page} 
          total={count} 
          showTotal={total => `Total ${total} items`}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSize={pageSize}
          pageSizeOptions={['10', '20', '50', '100']}
          onChange={setPage} />
      </PaginationContainer>
    </ControlBox>
  )

  return (
    <div>
      <SafeArea left right min={16}>
        <Up breakpoint="xl">
          { controls }
        </Up>
        <StyledTable
          loading={loading}
          dataSource={users} 
          rowClassName={record => record.checkedinAt && 'checked-in'}
          rowKey={record => record.id} 
          onRow={handleRow}
          pagination={false}
          scroll={{ x: 'max-content' }}
        >
          <Column title="Number" dataIndex="number" key="number" render={tags => formatQueueNumber(tags)} />
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Telephone" dataIndex="tel" key="tel" />
          <Column title="E-mail" dataIndex="email" key="email" />
          <Column title="Faculty" dataIndex="faculty" key="faculty" render={tags => t(`facultyNames.${tags}`)} />
          <Column title="Created" dataIndex="createdAt" key="createdAt" render={tags => formatDt(tags)} />
        </StyledTable>
      </SafeArea>
      <Sticky bottom>
        <StickyArea>
          <SafeArea left right min={16}>
            { controls }
          </SafeArea>
        </StickyArea>
      </Sticky>
      <EditUserModal
        data={(editingRow !== undefined && users[editingRow]) || {}}
        visible={editVisible}
        loading={loading}
        reload={fetchUsers}
        onDone={closeEditAndReload}
        onCancel={closeEdit} />
    </div>
  )
}

export default UsersTable
