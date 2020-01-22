import React from "react"
import styled from "styled-components"
import { Table , Form, Input} from "antd"

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



//I have absolutely no idea what's going on.
// Copied from https://ant.design/components/table/#components-table-demo-ajax
//
//
//
//
//
/*
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}
*/

const EditableContext = React.createContext();


class DataCell extends React.Component{

  renderCell = ({ getFieldDecorator }) => {
    const {
      editable,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex],
            })(<Input/>)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {

    return(
    <EditableContext.Consumer>
      {this.renderCell}

    </EditableContext.Consumer>
  )
  }
}



class DataTable extends React.Component {



  state = {
    data: [],
    pagination: { pageSize:10},
    loading: true,
    targetId: null
  };

  isEditting = (id) => (this.state.targetId == id);
  refresh(pager) {
    const pagination = pager || this.state.pagination;
    console.log("Pagination =" + pagination, " Cur=" + pagination.current + " PS="+pagination.pageSize)
    this.fetch({
      start: pagination.pageSize * (pagination.current-1) + 1,
      end: pagination.pageSize * pagination.current,
    });
  }
  save(form, rid) {
    let data = form.getFieldsValue();
    console.log("Saving" + data);
    reqwest({
      url: 'https://api-staging-dot-cutuball.appspot.com/admin/edit',
      method: 'put',
      data: JSON.stringify({...data, ID:rid}),
      contentType: 'application/json',
      headers: {Authorization: "Bearer " + localStorage.getItem('access_token')}
    }).then(data => {
      this.setState({
        targetId:null
      });
      this.refresh()

    }).fail( (error, msg) => {
      alert("Error while saving data " + error.response + " msg " + msg);
    });;
  }
  delete(rid) {
    reqwest({
      url: 'https://api-staging-dot-cutuball.appspot.com/admin/delete',
      method: 'delete',
      data: { id:rid},
      headers: {Authorization: "Bearer " + localStorage.getItem('access_token')}
    }).then(data => {
      this.setState({
        targetId:null
      })
      this.refresh()

    }).fail( (error, msg) => {
      alert("Error while deleting data " + error.response + " msg " + msg);
    });
  }
  constructor(props) {
    super(props);
    this.columns_tpl = [
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
        sortDirections: ['descend','ascend'],
        editable: true
      },
      {
        title:"ID",
        dataIndex:"id"
      },
      {
        title:"Telephone",
        dataIndex:"tel",
        editable: true,
      },
      {
        title:"E-mail",
        dataIndex:"email",
        editable: true
      },
      {
        title:"Faculty",
        dataIndex:"faculty",
        editable: true,
        sorter: true,
        sortDirections: ['descend','ascend']
      },
      {
        title:"Operation",
        dataIndex:"operation",
        editable:false,
        render: (text, record) => (
          <>
           <EditableContext.Consumer>
           { (form) => (
          (this.isEditting(record.id) ?
            <a onClick={()=>this.save(form, record.id)}>Save</a> : <a onClick={()=>{this.setState({targetId:record.id})}}>Edit</a>))
          }
          </EditableContext.Consumer>
            <br/><a onClick={()=>this.delete(record.id)}>Delete</a>
          </>
        )
      }
    ];
  }

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.refresh(pager);
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

    const columns = this.columns_tpl.map(
      (cols) => ({
        ...cols,
        onCell: (record) => ({
          dataIndex: cols.dataIndex,
          editable: cols.editable && this.isEditting(record.id),
          record: record
        })
      })
    )
    const components = {
      body : {
        cell: DataCell
      }
    }

    return (
<EditableContext.Provider value={this.props.form}>
      <Table
        columns={columns}
        components={components}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
</EditableContext.Provider>
    );
  }

}


const EditableFormTable = Form.create()(DataTable);


export default EditableFormTable;
