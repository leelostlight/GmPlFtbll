import { getSchedule } from '@/data/schedule'
import SchedulePageClient from '@/components/SchedulePageClient'

export default async function SchedulePage() {
  const schedule = await getSchedule()

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <SchedulePageClient schedule={schedule} week={1} />
    </main>
  )
}

