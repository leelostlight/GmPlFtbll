import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTeamById } from '@/data/teams'
import { getEnhancedStandings } from '@/data/standings'
import { getTeamLogoPath } from '@/lib/teamLogos'
import Link from 'next/link'

interface TeamPageProps {
  params: {
    teamId: string
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const team = await getTeamById(params.teamId)
  const enhancedStandings = await getEnhancedStandings()

  if (!team) {
    notFound()
  }

  // Find the team's enhanced data
  let teamData: any = null
  Object.values(enhancedStandings).forEach(conference => {
    Object.values(conference).forEach(division => {
      const found = division.find(t => t.team === team.name)
      if (found) teamData = found
    })
  })

  const winPercentage = (team.wins / (team.wins + team.losses + (team.ties || 0))) * 100
  const netPoints = team.pointsFor - team.pointsAgainst

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/teams" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← Back to Teams
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1rem' }}>
        <Image
          src={getTeamLogoPath(team.name)}
          alt={`${team.name} logo`}
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
        />
        <div>
          <h1 style={{ margin: 0 }}>{team.name}</h1>
          {teamData && (
            <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '0.5rem', marginBottom: 0 }}>
              Coach: {teamData.coach}
            </p>
          )}
        </div>
      </div>

      {/* Team Overview */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ marginTop: 0 }}>Season Overview</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          marginTop: '1rem'
        }}>
          <div>
            <h3 style={{ marginTop: 0, color: '#666' }}>Record</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
              {team.wins} - {team.losses}
              {team.ties !== undefined && team.ties > 0 && ` - ${team.ties}`}
            </p>
            <p>Win Percentage: {winPercentage.toFixed(1)}%</p>
            {teamData && <p>Streak: {teamData.Streak}</p>}
            {teamData && <p>Division Record: {teamData.Div}</p>}
          </div>
          
          <div>
            <h3 style={{ marginTop: 0, color: '#666' }}>Points</h3>
            <p>Points For: <strong>{team.pointsFor}</strong></p>
            <p>Points Against: <strong>{team.pointsAgainst}</strong></p>
            <p>Differential: <strong style={{ color: netPoints > 0 ? 'green' : netPoints < 0 ? 'red' : 'black' }}>
              {netPoints > 0 ? '+' : ''}{netPoints}
            </strong></p>
          </div>
          
          <div>
            <h3 style={{ marginTop: 0, color: '#666' }}>Division</h3>
            <p>Conference: <strong>{team.conference}</strong></p>
            <p>Division: <strong>{team.division}</strong></p>
          </div>
        </div>
      </div>

      {/* Game History */}
      {teamData && teamData.games && teamData.games.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Game History</h2>
          <table style={{ 
            borderCollapse: 'collapse', 
            width: '100%', 
            marginTop: '1rem',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'left' }}>Opponent</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Score</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Q1</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Q2</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Q3</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Q4</th>
                <th style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>Result</th>
              </tr>
            </thead>
            <tbody>
              {teamData.games.map((game: any, index: number) => {
                const won = game.score.self > game.score.opponent
                const lost = game.score.self < game.score.opponent
                
                return (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc', padding: '12px' }}>
                      <Link 
                        href={`/teams/${game.opponent.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{ color: '#0066cc', textDecoration: 'none' }}
                      >
                        {game.opponent}
                      </Link>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        vs {game.opponentCoach}
                      </div>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                      {game.score.self} - {game.score.opponent}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                      {game.quarters[0] || 0}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                      {game.quarters[1] || 0}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                      {game.quarters[2] || 0}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '12px', textAlign: 'center' }}>
                      {game.quarters[3] || 0}
                    </td>
                    <td style={{ 
                      border: '1px solid #ccc', 
                      padding: '12px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: won ? 'green' : lost ? 'red' : 'gray'
                    }}>
                      {won ? 'W' : lost ? 'L' : 'T'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}


