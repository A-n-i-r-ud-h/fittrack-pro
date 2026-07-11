import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Activity } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("SUBMIT WORKING") 
    setError('')

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950 px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint-500">
            <Activity size={18} strokeWidth={2.5} className="text-base-950" />
          </div>
          <span className="font-display text-lg font-semibold">FitTrack Pro</span>
        </Link>

        <div className="card p-8">
          <h1 className="mb-1 font-display text-2xl font-semibold">Create your account</h1>
          <p className="mb-6 text-sm text-base-400">Start logging workouts in under a minute.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-base-400">Full name</label>
              <input
                required
                className="input-field"
                placeholder="Alex Rivera"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-base-400">Email</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-base-400">Password</label>
              <input
                type="password"
                required
                className="input-field"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && (
              <p className="rounded-lg bg-coral-500/10 px-3 py-2 text-sm text-coral-400">{error}</p>
            )}

           <button
  type="button"
  onClick={() => {
    console.log("BUTTON CLICKED")
    handleSubmit({ preventDefault: () => {} })
  }}
  className="btn-primary w-full"
>
  Create Account
</button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-base-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-mint-400 hover:text-mint-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
