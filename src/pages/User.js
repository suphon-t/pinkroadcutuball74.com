import React from "react"
import ContentCard from "../components/ContentCard"
import { useGet } from "../api"

function User() {
  const { loading, data } = useGet('/test/protected')
  return (
    <ContentCard>
      { loading && 'Loading' }
      { data?.data }
    </ContentCard>
  )
}

export default User
