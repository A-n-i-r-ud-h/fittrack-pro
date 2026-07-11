import { useState } from 'react'
import { X } from 'lucide-react'

const todayStr = () => new Date().toISOString().split('T')[0]

export default function AddWorkoutModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', duration: '', calories: '', date: todayStr() })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Enter an exercise name')
    if (!form.duration || Number(form.duration) <= 0) return setError('Duration must be greater than 0')
    if (!form.calories || Number(form.calories) <= 0) return setError('Calories must be greater than 0')

    setSaving(true)
    try {
      await onSave({
        name: form.name.trim(),
        duration: Number(form.duration),
        calories: Number(form.calories),
        date: form.date
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save the workout. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-md p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold">Log a workout</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-base-400 transition-colors hover:bg-base-800 hover:text-base-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-base-400">Exercise name</label>
            <input
              className="input-field"
              placeholder="e.g. Running, Push-ups, Cycling"
              value={form.name}
              onChange={update('name')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm text-base-400">Duration (min)</label>
              <input
                type="number"
                min="1"
                className="input-field"
                placeholder="30"
                value={form.duration}
                onChange={update('duration')}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-base-400">Calories burned</label>
              <input
                type="number"
                min="1"
                className="input-field"
                placeholder="250"
                value={form.calories}
                onChange={update('calories')}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-base-400">Date</label>
            <input
              type="date"
              className="input-field"
              max={todayStr()}
              value={form.date}
              onChange={update('date')}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-coral-500/10 px-3 py-2 text-sm text-coral-400">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-60">
              {saving ? 'Saving…' : 'Save workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
