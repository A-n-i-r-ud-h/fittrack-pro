import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function WeeklyChart({ data }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
  }))

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Weekly calories burned</h3>
        <span className="rounded-full bg-mint-500/10 px-3 py-1 text-xs font-medium text-mint-400">
          Last 7 days
        </span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={formatted} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="calorieFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34E0A1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#34E0A1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1D222B" vertical={false} />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#7C8698', fontSize: 12 }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7C8698', fontSize: 12 }} width={36} />
          <Tooltip
            contentStyle={{
              background: '#171B22',
              border: '1px solid #2A303B',
              borderRadius: '0.75rem',
              fontSize: '0.8rem'
            }}
            labelStyle={{ color: '#C4CAD4' }}
            formatter={(value) => [`${value} kcal`, 'Calories']}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#34E0A1"
            strokeWidth={2.5}
            fill="url(#calorieFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
