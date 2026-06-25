"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const FLOATING_CARDS = [
  {
    platform: "Twitter / X",
    icon: "✕",
    color: "#1d9bf0",
    score: 91,
    content: "Dropped out. Built anyway.\n\nNo safety net. No plan B.\n\nJust a product and 14-hour days. 🚀",
    style: { top: "8%", left: "3%", rotate: "-4deg" },
    delay: "0s",
    duration: "7s",
  },
  {
    platform: "LinkedIn",
    icon: "in",
    color: "#0a66c2",
    score: 84,
    content: "Three years ago I walked out of my last lecture and never went back.\n\nI had a product, a handful of users, and zero certainty.\n\nHere's what no one tells you about betting on yourself:",
    style: { top: "5%", right: "3%", rotate: "3deg" },
    delay: "1.2s",
    duration: "9s",
  },
  {
    platform: "Reddit",
    icon: "👾",
    color: "#ff4500",
    score: 78,
    content: "Just got back from Bali and honestly still processing it. We spent our days on the beach, exploring markets, trying all the food — if you're thinking of going, Uluwatu at sunset is non-negotiable.",
    style: { bottom: "12%", left: "2%", rotate: "3deg" },
    delay: "0.6s",
    duration: "8s",
  },
  {
    platform: "Twitter / X",
    icon: "✕",
    color: "#1d9bf0",
    score: 88,
    content: "We hit 10k users with $0 marketing.\n\nHere's the exact playbook:\n\n→ Built in public\n→ Replied to every comment\n→ Shipped weekly\n\nDistribution > product.",
    style: { bottom: "8%", right: "2%", rotate: "-2deg" },
    delay: "2s",
    duration: "10s",
  },
  {
    platform: "LinkedIn",
    icon: "in",
    color: "#0a66c2",
    score: 79,
    content: "Visiting Bali with friends for spring break taught me that the best experiences come from stepping outside comfort zones.\n\nWhat travel destinations have inspired you?",
    style: { top: "42%", left: "1%", rotate: "-3deg" },
    delay: "3s",
    duration: "11s",
  },
]

function FloatingCard({ card }: { card: typeof FLOATING_CARDS[0] }) {
  return (
    <div
      className="float-card absolute w-56 rounded-2xl p-4 backdrop-blur-md cursor-default"
      style={{
        ...card.style,
        animationDuration: card.duration,
        animationDelay: card.delay,
        zIndex: 3,
        background: "rgba(14,14,14,0.5)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white opacity-70"
            style={{ backgroundColor: card.color }}
          >
            {card.icon}
          </span>
          <span className="text-[10px] font-medium text-white/30">{card.platform}</span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold opacity-60"
          style={{ backgroundColor: `${card.color}20`, color: card.color }}
        >
          🔥 {card.score}/100
        </span>
      </div>
      <p className="text-[11px] leading-relaxed text-white/25 line-clamp-4">{card.content}</p>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("judge@viralloop.app")
  const [password, setPassword] = useState("demo2026")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined" && localStorage.getItem("vl-auth")) {
      router.replace("/dashboard")
    }
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
        setError("Invalid credentials. Use the demo ones above.")
        setLoading(false)
      }
    } catch {
      setError("Something went wrong. Try again.")
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        .float-card { animation-name: float-card; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .float-card:hover {
          border: 1px solid #7c3aed !important;
          box-shadow: 0 0 20px rgba(124,58,237,0.6), 0 0 40px rgba(234,179,8,0.25) !important;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#080808]">
        {/* Background blobs */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#4c1d95] opacity-20 blur-[140px] animate-blob-1" />
          <div className="absolute top-1/2 right-0 h-[30rem] w-[30rem] rounded-full bg-[#3730a3] opacity-15 blur-[120px] animate-blob-2" />
          <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-[#164e63] opacity-15 blur-[120px] animate-blob-3" />
        </div>

        {/* Grid */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Floating cards */}
        {FLOATING_CARDS.map((card, i) => (
          <FloatingCard key={i} card={card} />
        ))}

        {/* Subtle center vignette */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 50% 50%, rgba(8,8,8,0.7) 0%, transparent 100%)",
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

        {/* Form */}
        <div className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-12">
          <div
            className="w-full max-w-sm"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
              <p className="mt-2 text-sm text-white/40">Sign in to your ViralLoop account</p>
            </div>

            {/* Demo hint */}
            <div className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-[10px] font-bold text-amber-400">i</span>
                <div>
                  <p className="text-xs font-semibold text-amber-400">Demo credentials pre-filled</p>
                  <p className="mt-0.5 text-[11px] text-amber-400/60">Just hit <span className="font-medium">Sign in</span> — no account needed.</p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_100px_rgba(124,58,237,0.12)]">
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at top, rgba(124,58,237,0.12), transparent 65%)" }} />

              <div className="relative flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/40">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/40">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">{error}</p>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="group mt-1 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.45)] transition-all hover:bg-violet-500 hover:shadow-[0_0_45px_rgba(124,58,237,0.65)] disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>Sign in <span className="transition-transform group-hover:translate-x-0.5">→</span></>
                    )}
                  </span>
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] text-white/20">
              Built for the H0 Hackathon · AWS DynamoDB + Vercel
            </p>
          </div>
        </div>
      </div>
    </>
  )
}