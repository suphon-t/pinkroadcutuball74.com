import AuthProvider, { AuthContext } from "./AuthProvider"
import { useContext } from "react"

export default AuthProvider

export function useAuthContext() {
  return useContext(AuthContext)
}
