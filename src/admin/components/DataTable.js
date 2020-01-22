import React from "react"
import styled from "styled-components"
import { Table } from "antd"

import { useFakeGet } from "../../api"
import vars from "../../styles/vars"
import { darken, lighten } from "polished"

import reqwest from 'reqwest'

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
/*  {
    title:"Number",
    dataIndex:"number",
    sorter: true,
    defaultSortOrder: 'descend',
    sortDirections: ['descend','ascend']
  },*/
  {
    title:"Name",
    dataIndex:"name",
    sorter: true,
    sortDirections: ['descend','ascend']
  },
  {
    title:"ID",
    dataIndex:"id"
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

//I have absolutely no idea what's going on.
// Copied from https://ant.design/components/table/#components-table-demo-ajax
//
class DataTable extends React.Component {

  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {start: 1, end:10}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'https://api-staging-dot-cutuball.appspot.com/admin/getusers',
      method: 'get',
      data: params,
      type: 'json',
      headers: {Authorization: "Bearer " + localStorage.getItem('access_token')}
    }).then(data => {
      this.setState({
        loading: false,
        data: data
      });

      console.log("Cur data " + data);
    });

    reqwest({
      url: 'https://api-staging-dot-cutuball.appspot.com/admin/getstat',
      method: 'get',
      type: 'json',
      headers: {Authorization: "Bearer " + localStorage.getItem('access_token')}
    }).then(data => {
      const pagination = { ...this.state.pagination };
      pagination.total = data.regist;
      this.setState({
        pagination
      });

      console.log("Total regist " + data.regist);
    });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }

}

export default DataTable
