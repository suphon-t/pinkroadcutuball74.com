import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { Table } from "antd"
import { useHttpContext, usePromise } from "../../api"



function UsersTable() {
  const { http } = useHttpContext()
  const { data, loading, setPromise } = usePromise()
  const fetch = useCallback(() => {
    const users = http.get("/admin/getusers")
    const stats = http.get("/admin/getstats")
    setPromise(Promise.all([users, stats]))
  }, [http, setPromise])
  console.log(data, loading)
  return null
}

export default UsersTable
