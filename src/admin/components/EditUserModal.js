import React, { useCallback, useEffect, useMemo } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { Form, Popconfirm, notification, Button } from "antd"
import qs from "qs"

import { useHttpContext, usePromise } from "../../api"
import CustomModal from "../../components/CustomModal"
import { useForm, FormContext } from "react-hook-form"
import Field from "../../components/Field"
import DialogSelect from "../../components/DialogSelect"
import { useFacultyOptions, formatQueueNumber, formatDt } from "../../utils"
import { userSchemaEn } from "../../utils/validation"
import Title from "../../components/Title"
import OrangeButton from "../../components/OrangeButton"
import ButtonBar from "../../components/ButtonBar"

const Timestamp = styled.div`
  margin: 8px 0;
`

function EditUserModal({ data, onDone, reload, loading: tableLoading, ...props }) {
  const { t } = useTranslation()
  const { http } = useHttpContext()
  const facultyOptions = useFacultyOptions()
  const methods = useForm({ validationSchema: userSchemaEn, mode: 'onChange' })
  const { setValue, triggerValidation, handleSubmit } = methods

  const { loading: saving, setPromise } = usePromise()
  const loading = tableLoading || saving

  const notify = useCallback((type, text) => {
    notification[type]({
      message: `${text} user ${data.id} (${data.name})`,
    })
  }, [data])

  const handlePromise = useCallback((promise, msg1, msg2, onSuccess) => {
    return setPromise(promise)
      .then(() => {
        (onSuccess || onDone)()
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

  const onCheckIn = useCallback(async () => {
    handlePromise(http.post('/staff/checkin', qs.stringify({ id: data.id })), 'Checked in', 'check in', reload)
  }, [http, handlePromise, data, reload])

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach(key => {
        const formKey = key === 'id' ? 'ID' : key
        setValue(formKey, data[key])
        triggerValidation(formKey)
      })
    }
  }, [data, setValue, triggerValidation])

  const createdAt = useMemo(() => formatDt(data?.createdAt), [data])
  const modifiedAt = useMemo(() => formatDt(data?.modifiedAt), [data])
  const checkedInAt = useMemo(() => formatDt(data?.checkedinAt), [data])

  return (
    <CustomModal {...props}>
      <Title>Edit user {data?.id}</Title>
      <FormContext {...methods}>
        <Form style={{ marginTop: 28 }} layout="vertical" onSubmit={handleSubmit(onSubmit)}>
          <Field name="name" title={t("fullname")} rules={{ required: true }} defaultValue={data?.name} disabled={loading} />
          <Field name="ID" title={t("idNumber")} pattern="\d*" defaultValue={data?.id} disabled />
          <Field name="tel" title={t("phoneNumber")} type="tel" defaultValue={data?.tel} disabled={loading} />
          <Field name="email" title={t("email")} type="email" defaultValue={data?.email} disabled={loading} />
          <Field name="faculty" title={t("faculty")} defaultValue={data?.faculty} disabled={loading}>
            <DialogSelect options={facultyOptions} keepScroll />
          </Field>
          <Timestamp>
            <p>Created at {createdAt}</p>
            <p>Last modified at {modifiedAt}</p>
            { checkedInAt ? (
              <>
                <p>Checked in at {checkedInAt}</p>
                <p>Queue number: {formatQueueNumber(data?.number)}</p>
              </>
            ) : (
              <p>
                {`Hasn't checked in yet `}
                <Button type="primary" size="small" onClick={onCheckIn} loading={loading}>Check in</Button>
              </p>
            ) }
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

export default EditUserModal
