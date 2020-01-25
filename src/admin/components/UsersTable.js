import React, { useState, useCallback, useEffect, useMemo } from "react"
import styled from "styled-components"
import { darken, lighten } from "polished"
import { useTranslation } from "react-i18next"
import { Table, Pagination, Form, Popconfirm, notification, Input, Icon, Button } from "antd"
import debounce from "lodash.debounce"
import qs from "qs"

import { useHttpContext, usePromise, useGet } from "../../api"
import CustomModal from "../../components/CustomModal"
import vars from "../../styles/vars"
import { useForm, FormContext } from "react-hook-form"
import Field from "../../components/Field"
import DialogSelect from "../../components/DialogSelect"
import { useFacultyOptions } from "../../utils"
import { userSchema } from "../../utils/validation"
import Title from "../../components/Title"
import OrangeButton from "../../components/OrangeButton"
import ButtonBar from "../../components/ButtonBar"

import { parseISO, format } from "date-fns"

const { Column } = Table

const ControlBox = styled.div`
  display: flex;
  padding: 16px 0;

  flex-flow: wrap;
  justify-content: space-between;
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

function formateDt(dt) {
  if (!dt) return dt
  return format(parseISO(dt), 'HH:mm:ss dd/MM/yyyy')
}

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

  const controls = (
    <ControlBox>
      <Input
        style={{ width: 250, marginRight: 16 }} 
        value={searchValue}
        onChange={onSearch}
        placeholder="Search users"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
      <Pagination 
        current={page} 
        total={count} 
        showTotal={total => `Total ${total} items`}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSize={pageSize}
        pageSizeOptions={['10', '20', '50', '100']}
        onChange={setPage} />
    </ControlBox>
  )

  return (
    <div>
      { controls }
      <StyledTable 
        loading={loading}
        dataSource={users} 
        rowKey={record => record.id} 
        onRow={handleRow}
        pagination={false}
      >
        <Column title="Number" dataIndex="number" key="number" />
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Telephone" dataIndex="tel" key="tel" />
        <Column title="E-mail" dataIndex="email" key="email" />
        <Column title="Faculty" dataIndex="faculty" key="faculty" render={tags => t(`facultyNames.${tags}`)} />
        <Column title="Created" dataIndex="createdAt" key="createdAt" render={tags => formateDt(tags)} />
      </StyledTable>
      { controls }
      <EditModal data={editingRow} visible={editVisible} onDone={closeEditAndReload} onCancel={closeEdit} />
    </div>
  )
}

const Timestamp = styled.div`
  margin: 8px 0;
`

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

  const handlePromise = useCallback((promise, msg1, msg2) => {
    return setPromise(promise)
      .then(() => {
        onDone()
        notify('success', msg1)
      }, error => {
        console.log(error?.response?.data || error)
        notify('error', `Failed to ${msg2}`)
      })
  }, [notify, onDone, setPromise])

  const onSubmit = useCallback(formData => {
    handlePromise(http.put('/admin/edit', formData), 'Edited', 'edit')
  }, [http, handlePromise])

  const onDelete = useCallback(() => {
    handlePromise(http.delete('/admin/delete', { params: { id: data.id } }), 'Deleted', 'delete')
  }, [http, handlePromise, data])

  const onCheckIn = useCallback(() => {
    handlePromise(http.post('/staff/checkin', qs.stringify({ id: data.id })), 'Checked in', 'check in')
  }, [http, handlePromise, data])

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach(key => {
        const formKey = key === 'id' ? 'ID' : key
        setValue(formKey, data[key])
        triggerValidation(formKey)
      })
    }
  }, [data, setValue, triggerValidation])

  const createdAt = useMemo(() => formateDt(data?.createdAt), [data])
  const modifiedAt = useMemo(() => formateDt(data?.modifiedAt), [data])
  const checkedInAt = useMemo(() => formateDt(data?.checkedinAt), [data])

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
            <DialogSelect options={facultyOptions} keepScroll />
          </Field>
          <Timestamp>
            <p>Created at {createdAt}</p>
            <p>Last modified at {modifiedAt}</p>
            <p>{ checkedInAt ? `Checked in at ${checkedInAt}` : (
              <>
                {`Hasn't checked in yet `}
                <Button type="primary" size="small" onClick={onCheckIn} loading={loading}>Check in</Button>
              </>
            ) }</p>
          </Timestamp>
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
