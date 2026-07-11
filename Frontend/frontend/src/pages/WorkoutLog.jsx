import { useEffect, useState } from 'react'
import { Plus, Dumbbell } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import WorkoutRow from '../components/WorkoutRow.jsx'
import AddWorkoutModal from '../components/AddWorkoutModal.jsx'
import { getWorkouts, addWorkout, deleteWorkout } from '../api/api.js'

export default function WorkoutLog() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const loadWorkouts = async () => {
    setLoading(true)
    const { data } = await getWorkouts()
    setWorkouts(data)
    setLoading(false)
  }

  useEffect(() => {
    loadWorkouts()
  }, [])

  const handleSave = async (workout) => {
    await addWorkout(workout)
    setShowModal(false)
    loadWorkouts()
  }

  const handleDelete = async (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id))
    try {
      await deleteWorkout(id)
    } catch {
      loadWorkouts()
    }
  }

  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-semibold sm:text-3xl">Workout log</h1>
            <p className="mt-1 text-sm text-base-400">Every session, in one place.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={16} /> Log workout
          </button>
        </div>

        {loading ? (
          <div className="card h-64 animate-pulse bg-base-900" />
        ) : workouts.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-800 text-base-400">
              <Dumbbell size={22} />
            </div>
            <p className="font-display text-lg font-semibold">No workouts yet</p>
            <p className="max-w-xs text-sm text-base-400">
              Log your first workout to start building your history and weekly trend.
            </p>
            <button onClick={() => setShowModal(true)} className="btn-primary mt-2">
              <Plus size={16} /> Log workout
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden">
            {workouts.map((workout) => (
              <WorkoutRow key={workout.id} workout={workout} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {showModal && <AddWorkoutModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  )
}
