import { getGenerations } from "@/lib/history-store"
import { HistoryClient } from "@/components/history-client"

export const dynamic = "force-dynamic"

export default async function HistoryPage() {
  const generations = await getGenerations()
  return <HistoryClient generations={generations} />
}