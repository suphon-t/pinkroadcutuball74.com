import AuthProvider, { AuthContext } from "./AuthProvider"
import { useContext } from "react"

export { AuthProvider }

export function useAuthContext() {
  return useContext(AuthContext)
}
