import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { darken, lighten } from "polished"
import { useTranslation } from "react-i18next"
import { Table, Pagination, Form, Popconfirm, notification } from "antd"

import { useHttpContext, usePromise } from "../../api"
import CustomModal from "../../components/CustomModal"
import vars from "../../styles/vars"
import { useForm, FormContext } from "react-hook-form"
import Field from "../../components/Field"
import DialogSelect from "../../components/DialogSelect"
import { useFacultyOptions, userSchema } from "../../utils"
import Title from "../../components/Title"
import OrangeButton from "../../components/OrangeButton"
import ButtonBar from "../../components/ButtonBar"

const { Column } = Table

const pageSize = 10

const PaginationContainer = styled.div`
  display: flex;
  padding: 16px 0;

  justify-content: end;
  flex-direction: row-reverse;
`

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

  .ant-table-row {
    cursor: pointer;
  }
`

function TablePagination(props) {
  return (
    <PaginationContainer>
      <Pagination {...props} />
    </PaginationContainer>
  )
}

function UsersTable() {
  const { http } = useHttpContext()
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const { data, loading, setPromise } = usePromise()
  const fetchUsers = useCallback(() => {
    const users = http.get("/admin/getusers", {
      params: {
        start: pageSize * (page - 1),
        end: pageSize * page,
      }
    })
    const stat = http.get("/admin/getstat")
    setPromise(Promise.all([users, stat]))
  }, [http, page, setPromise])

  // Fetch the data
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const users = data && data[0].data
  const stat = data && data[1].data

  const [editVisible, setEditVisible] = useState(false)
  const [editingRow, setEditingRow] = useState({})

  const closeEdit = useCallback(() => {
    setEditVisible(false)
  }, [])

  const closeEditAndReload = useCallback(() => {
    setEditVisible(false)
    fetchUsers()
  }, [fetchUsers])

  const handleRow = useCallback((_, rowIndex) => ({
    onClick: () => {
      setEditingRow(users[rowIndex])
      setEditVisible(true)
    }
  }), [users])

  return (
    <div>
      <TablePagination current={page} total={stat?.regist} onChange={setPage} />
      <StyledTable 
        loading={loading}
        dataSource={users} 
        rowKey={record => record.id} 
        onRow={handleRow}
        pagination={false}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Telephone" dataIndex="tel" key="tel" />
        <Column title="E-mail" dataIndex="email" key="email" />
        <Column title="Faculty" dataIndex="faculty" key="faculty" render={tags => t(`facultyNames.${tags}`)} />
      </StyledTable>
      <TablePagination current={page} total={stat?.regist} onChange={setPage} />
      <EditModal data={editingRow} visible={editVisible} onDone={closeEditAndReload} onCancel={closeEdit} />
    </div>
  )
}

function EditModal({ data, onDone, ...props }) {
  const { t } = useTranslation()
  const { http } = useHttpContext()
  const facultyOptions = useFacultyOptions()
  const methods = useForm({ validationSchema: userSchema, mode: 'onChange' })
  const { setValue, triggerValidation, handleSubmit } = methods

  const { loading, setPromise } = usePromise()

  const notify = useCallback((type, text) => {
    notification[type]({
      message: `${text} user ${data.id} (${data.name})`,
    })
  }, [data])

  const onSubmit = useCallback(formData => {
    setPromise(
      http.put('/admin/edit', formData)
        .then(() => {
          onDone()
          notify('success', 'Edited')
        })
        .catch(error => {
          console.log(error)
          notify('error', 'Failed to edit')
        })
    )
  }, [http, notify, onDone, setPromise])

  const onDelete = useCallback(() => {
    setPromise(
      http.delete('/admin/delete', { params: { id: data.id } })
        .then(() => {
          onDone()
          notify('success', 'Deleted')
        })
        .catch(error => {
          console.log(error)
          notify('error', 'Failed to delete')
        })
    )
  }, [http, notify, data, onDone, setPromise])

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach(key => {
        const formKey = key === 'id' ? 'ID' : key
        setValue(formKey, data[key])
        triggerValidation(formKey)
      })
    }
  }, [data, setValue, triggerValidation])

  return (
    <CustomModal {...props}>
      <Title>Edit user {data?.id}</Title>
      <FormContext {...methods}>
        <Form style={{ marginTop: 28 }} layout="vertical" onSubmit={handleSubmit(onSubmit)}>
          <Field name="name" title={t("fullname")} rules={{ required: true }} defaultValue={data?.name} />
          <Field name="ID" title={t("idNumber")} pattern="\d*" defaultValue={data?.id} disabled />
          <Field name="tel" title={t("phoneNumber")} type="tel" defaultValue={data?.tel} />
          <Field name="email" title={t("email")} type="email" defaultValue={data?.email} />
          <Field name="faculty" title={t("faculty")} defaultValue={data?.faculty}>
            <DialogSelect options={facultyOptions} />
          </Field>
          <ButtonBar style={{ direction: 'rtl', marginTop: 16 }}>
            <OrangeButton background="#40edc2" color="white" type="submit" disabled={loading}>Save</OrangeButton>
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <OrangeButton background="#ff4d4f" color="white" disabled={loading}>Delete</OrangeButton>
            </Popconfirm>
          </ButtonBar>
        </Form>
      </FormContext>
    </CustomModal>
  )
}

export default UsersTable
