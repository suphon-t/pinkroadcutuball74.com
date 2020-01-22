import React from "react"
import styled from "styled-components"
import { Table } from "antd"

import { useFakeGet } from "../../api"
import vars from "../../styles/vars"
import { darken, lighten } from "polished"

const StyledTable = styled(Table)`
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
`

const columns = [
  {
    title:"Number", 
    dataIndex:"number", 
    sorter: true,
    defaultSortOrder: 'descend',
    sortDirections: ['descend','ascend']
  },
  {
    title:"Name",
    dataIndex:"name",
    sorter: true,
    sortDirections: ['descend','ascend']
  },
  {
    title:"ID",
    dataIndex:"ID"
  },
  {
    title:"Telephone",
    dataIndex:"tel",
  },
  {
    title:"E-mail",
    dataIndex:"email"
  },
  {
    title:"Faculty",
    dataIndex:"faculty",
    sorter: true,
    sortDirections: ['descend','ascend']
  }  
]

function DataTable() {
  const { data, loading } = useFakeGet('/users')
  return (
    <StyledTable loading={loading} dataSource={data} columns={columns} />
  )
}

export default DataTable
