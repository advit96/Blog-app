import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setToken, setUser } = useAuth()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setToken(data.token)
      setUser(data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-2xl font-semibold mb-2">Login</h2>
      <p className="mb-4 text-sm text-gray-600">Welcome back. Enter your details to continue.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Email</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Password</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-md bg-gray-900 text-white py-2 shadow hover:bg-black">Login</button>
      </form>
      <p className="text-sm text-gray-600 mt-3">Don't have an account? <Link className="underline" to="/signup">Signup</Link></p>
    </div>
  )
}


