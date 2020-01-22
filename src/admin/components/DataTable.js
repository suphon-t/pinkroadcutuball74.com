import React from "react"

import { Table } from "antd"
import { useFakeGet } from "../../api"

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
    <Table loading={loading} dataSource={data} columns={columns} />
  )
}

export default DataTable
