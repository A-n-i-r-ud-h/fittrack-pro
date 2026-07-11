export default function StatCard({ icon: Icon, label, value, unit, accent = 'mint' }) {
  const accentClasses = {
    mint: 'text-mint-400 bg-mint-500/10',
    coral: 'text-coral-400 bg-coral-500/10'
  }

  return (
    <div className="card flex items-center gap-4 p-6 transition-transform hover:-translate-y-0.5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm text-base-400">{label}</p>
        <p className="font-display text-2xl font-semibold text-base-50">
          {value}
          {unit && <span className="ml-1 text-base text-base-400">{unit}</span>}
        </p>
      </div>
    </div>
  )
}
