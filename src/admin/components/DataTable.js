import React from "react"
import styled from "styled-components"
import vars from "../../styles/vars"

import {Table} from "antd"

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
  return <Table columns={columns} dataSource={data} onChange={onChange} />
}

export default DataTable