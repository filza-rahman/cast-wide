"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("judge@viralloop.app")
  const [password, setPassword] = useState("demo2026")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem("vl-auth")) router.replace("/dashboard")
  }, [router])

  async function handleLogin() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("vl-auth", "true")
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Try the demo ones above.")
        setLoading(false)
      }
    } catch {
      setError("Something went wrong. Try again.")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#080808] overflow-hidden">
      {/* Animated background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[45rem] w-[45rem] rounded-full bg-[#4c1d95] opacity-25 blur-[140px] animate-blob-1" />
        <div className="absolute top-1/3 -right-32 h-[35rem] w-[35rem] rounded-full bg-[#3730a3] opacity-20 blur-[120px] animate-blob-2" />
        <div className="absolute -bottom-20 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[#164e63] opacity-20 blur-[120px] animate-blob-3" />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 shadow-[0_0_16px_rgba(124,58,237,0.5)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={2.5}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight text-white">ViralLoop</span>
        </Link>
        <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
          ← Back to home
        </Link>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-md"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-white/40">
              Sign in to your ViralLoop account
            </p>
          </div>

          {/* Demo credentials banner */}
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold">i</span>
              <div>
                <p className="text-xs font-semibold text-amber-400">Demo credentials pre-filled</p>
                <p className="mt-0.5 text-xs text-amber-400/60">Just hit <span className="font-medium">Sign in</span> to explore the app — no account needed.</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md shadow-[0_0_80px_rgba(124,58,237,0.1)]">
            {/* Glow border effect */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-50"
              style={{ background: "radial-gradient(ellipse at top, rgba(124,58,237,0.15), transparent 70%)" }}
            />

            <div className="relative flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 tracking-wide uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="group relative mt-1 w-full overflow-hidden rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-white/20">
            Built for the H0 Hackathon · AWS DynamoDB + Vercel
          </p>
        </div>
      </div>
    </div>
  )
}