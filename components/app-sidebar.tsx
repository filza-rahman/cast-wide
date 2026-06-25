"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { History, LayoutDashboard, Settings, Zap } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar">
      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-5 text-sidebar-foreground"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </span>
        <span className="text-base font-semibold tracking-tight">ViralLoop</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
              VL
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Demo User
            </p>
            <p className="truncate text-xs text-muted-foreground">
              judge@viralloop.app
            </p>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem("vl-auth"); window.location.href = "/" }}
          className="mt-3 w-full rounded-lg border border-sidebar-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
