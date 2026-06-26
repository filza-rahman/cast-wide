"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("vl-auth")) {
      router.replace("/login")
    } else {
      setChecked(true)
    }
  }, [router])

if (!checked) return <div className="min-h-screen bg-[#080808]" />
  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border md:block">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}