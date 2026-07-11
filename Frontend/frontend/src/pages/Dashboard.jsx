import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ListChecks, Plus, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import StatCard from '../components/StatCard.jsx'
import WeeklyChart from '../components/WeeklyChart.jsx'
import AddWorkoutModal from '../components/AddWorkoutModal.jsx'
import { getSummary, getWeeklyStats, addWorkout } from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [weekly, setWeekly] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const [summaryRes, weeklyRes] = await Promise.all([getSummary(), getWeeklyStats()])
    setSummary(summaryRes.data)
    setWeekly(weeklyRes.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSave = async (workout) => {
    await addWorkout(workout)
    setShowModal(false)
    loadData()
  }

  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="mt-1 text-sm text-base-400">Here's how today is shaping up.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={16} /> Log workout
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-24 animate-pulse bg-base-900" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={Flame} label="Calories burned today" value={summary.totalCaloriesToday} unit="kcal" accent="coral" />
              <StatCard icon={ListChecks} label="Workouts today" value={summary.workoutsToday} />
              <StatCard icon={TrendingUp} label="Workouts this week" value={summary.totalWorkoutsThisWeek} />
            </div>

            <div className="mt-6">
              <WeeklyChart data={weekly} />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl2 border border-base-800 bg-base-900/40 px-6 py-4">
              <p className="text-sm text-base-400">Want the full history of every logged workout?</p>
              <Link to="/workouts" className="text-sm font-medium text-mint-400 hover:text-mint-300">
                View workout log →
              </Link>
            </div>
          </>
        )}
      </main>

      {showModal && <AddWorkoutModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  )
}
