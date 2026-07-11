import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Activity, LayoutDashboard, ListChecks, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = (path) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-mint-500/10 text-mint-400'
        : 'text-base-400 hover:text-base-50'
    }`

  return (
    <nav className="sticky top-0 z-40 border-b border-base-800 bg-base-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint-500">
            <Activity size={18} strokeWidth={2.5} className="text-base-950" />
          </div>
          <span className="font-display text-lg font-semibold">FitTrack Pro</span>
        </Link>

        {user && (
          <div className="hidden items-center gap-1 sm:flex">
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link to="/workouts" className={linkClass('/workouts')}>
              <ListChecks size={16} /> Workouts
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-base-400 md:inline">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-xs">
                <LogOut size={14} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-base-400 hover:text-base-50">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary !px-5 !py-2 text-xs">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-1 border-t border-base-800 px-6 py-2 sm:hidden">
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/workouts" className={linkClass('/workouts')}>
            <ListChecks size={16} /> Workouts
          </Link>
        </div>
      )}
    </nav>
  )
}
