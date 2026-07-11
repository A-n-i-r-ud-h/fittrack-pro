import { createContext, useContext, useState, useCallback } from 'react'
import { loginUser, registerUser } from '../api/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('fittrack_user')
    return stored ? JSON.parse(stored) : null
  })

  const persistSession = (data) => {
    localStorage.setItem('fittrack_token', data.token)
    const userData = { id: data.id, name: data.name, email: data.email }
    localStorage.setItem('fittrack_user', JSON.stringify(userData))
    setUser(userData)
  }

  const login = useCallback(async (email, password) => {
    const { data } = await loginUser({ email, password })
    persistSession(data)
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const { data } = await registerUser({ name, email, password })
    persistSession(data)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('fittrack_token')
    localStorage.removeItem('fittrack_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
