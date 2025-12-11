import StandingsTabs from '@/components/StandingsTabs'
import { getConferenceStandings, getStandings } from '@/data/standings'

export default async function StandingsPage() {
  const conferenceStandings = await getConferenceStandings()
  const divisionalStandings = await getStandings()

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Week 2 Standings</h1>
      <StandingsTabs 
        conferenceStandings={conferenceStandings}
        divisionalStandings={divisionalStandings}
      />
    </main>
  )
}

