import { Link } from 'react-router-dom'
import { ArrowRight, Flame, LineChart, ListChecks } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-mint-500/10 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-800 bg-base-900 px-4 py-1.5 text-xs font-medium text-base-400">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
            Built for consistency, not vanity metrics
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-base-50 sm:text-6xl">
            Log the work.
            <br />
            <span className="text-mint-400">Watch it add up.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-base-400 sm:text-lg">
            FitTrack Pro is a no-nonsense way to record workouts, track calories burned,
            and see your weekly progress — without the clutter of a full training app.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup" className="btn-primary w-full sm:w-auto">
              Start tracking free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary w-full sm:w-auto">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-t border-base-800 bg-base-900/40 px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <div className="card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mint-500/10 text-mint-400">
              <ListChecks size={20} />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Log in seconds</h3>
            <p className="text-sm text-base-400">
              Exercise, duration, calories, date. Four fields, no friction.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-coral-500/10 text-coral-400">
              <Flame size={20} />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Today at a glance</h3>
            <p className="text-sm text-base-400">
              A clean dashboard shows calories burned and workouts completed today.
            </p>
          </div>
          <div className="card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mint-500/10 text-mint-400">
              <LineChart size={20} />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">See the trend</h3>
            <p className="text-sm text-base-400">
              A simple weekly chart shows whether you're building momentum.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-base-800 px-6 py-8 text-center text-sm text-base-400">
        © {new Date().getFullYear()} FitTrack Pro. Built for people who just want to train.
      </footer>
    </div>
  )
}
