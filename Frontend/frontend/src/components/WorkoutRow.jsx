import { Flame, Clock, Trash2 } from 'lucide-react'

export default function WorkoutRow({ workout, onDelete }) {
  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="group flex items-center justify-between gap-4 border-b border-base-800 px-6 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-base-50">{workout.name}</p>
        <p className="text-sm text-base-400">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-base-400">
        <Clock size={14} />
        {workout.duration} min
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-coral-400">
        <Flame size={14} />
        {workout.calories} kcal
      </div>

      <button
        onClick={() => onDelete(workout.id)}
        className="rounded-full p-2 text-base-400 opacity-0 transition-all hover:bg-coral-500/10 hover:text-coral-400 group-hover:opacity-100"
        aria-label="Delete workout"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
