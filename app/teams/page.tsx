import Link from 'next/link'
import Image from 'next/image'
import { getAllTeams } from '@/data/teams'
import { getEnhancedStandings } from '@/data/standings'
import { getTeamLogoPath } from '@/lib/teamLogos'

export default async function TeamsPage() {
  const teams = await getAllTeams()
  const enhancedStandings = await getEnhancedStandings()
  
  // Create a map of team names to their enhanced data (for coach, streak, etc.)
  const teamDataMap = new Map<string, any>()
  Object.values(enhancedStandings).forEach(conference => {
    Object.values(conference).forEach(division => {
      division.forEach(teamData => {
        teamDataMap.set(teamData.team, teamData)
      })
    })
  })

  // Sort teams by conference, then division, then win percentage
  const sortedTeams = teams.sort((a, b) => {
    if (a.conference !== b.conference) {
      return a.conference.localeCompare(b.conference)
    }
    if (a.division !== b.division) {
      return a.division.localeCompare(b.division)
    }
    const aWinPct = a.wins / (a.wins + a.losses + (a.ties || 0))
    const bWinPct = b.wins / (b.wins + b.losses + (b.ties || 0))
    return bWinPct - aWinPct
  })

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Teams</h1>
      
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '2rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Team</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Coach</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Conference</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Division</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>W</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>L</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>T</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Win %</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>PF</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>PA</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Net</th>
            <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Streak</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => {
            const enhancedData = teamDataMap.get(team.name)
            const winPercentage = (team.wins / (team.wins + team.losses + (team.ties || 0))) * 100
            const netPoints = team.pointsFor - team.pointsAgainst
            
            return (
              <tr key={team.id}>
                <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image
                      src={getTeamLogoPath(team.name)}
                      alt={`${team.name} logo`}
                      width={40}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                    <Link 
                      href={`/teams/${team.id}`}
                      style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      {team.name}
                    </Link>
                  </div>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {enhancedData?.coach || '-'}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {team.conference}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {team.division}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>{team.wins}</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>{team.losses}</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>{team.ties || 0}</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {winPercentage.toFixed(1)}%
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>{team.pointsFor}</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>{team.pointsAgainst}</td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {netPoints > 0 ? '+' : ''}{netPoints}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                  {enhancedData?.Streak || '-'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}

