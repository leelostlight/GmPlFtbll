import { getWeek2Games } from '@/data/games/week2'
import SchedulePageClient from '@/components/SchedulePageClient'

export default async function Week2SchedulePage() {
  const games = await getWeek2Games()

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <SchedulePageClient schedule={games} week={2} />
    </main>
  )
}

