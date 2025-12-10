import { getNextWeekSchedule } from '@/data/nextWeekSchedule'
import { predictGameScores } from '@/data/predictions'
import Link from 'next/link'
import Image from 'next/image'
import { getTeamLogoPath } from '@/lib/teamLogos'
import CommentsBox from '@/components/CommentsBox'

export default async function NextWeekSchedulePage() {
  const schedule = await getNextWeekSchedule()
  const predictedGames = await predictGameScores(schedule)

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/schedule" style={{ color: '#0066cc', textDecoration: 'none' }}>
          ← Back to Week 1 Results
        </Link>
      </div>
      
      <h1 style={{ marginBottom: '2rem' }}>Week 2 Schedule & Predictions</h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #ddd'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          <strong>Note:</strong> Predictions are based on Week 1 statistics including points scored/allowed, 
          offensive efficiency, and defensive performance.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {predictedGames.map((game) => {
          const homeWins = game.predictedHomeScore > game.predictedAwayScore
          
          return (
            <div
              key={game.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Away Team */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  flex: 1,
                  minWidth: '200px'
                }}>
                  <Image
                    src={getTeamLogoPath(game.awayTeam)}
                    alt={`${game.awayTeam} logo`}
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <Link
                      href={`/teams/${game.awayTeam.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ 
                        color: '#0066cc', 
                        textDecoration: 'none', 
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}
                    >
                      {game.awayTeam}
                    </Link>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                      Avg: {game.awayTeamAvgPointsFor.toFixed(1)} PF / {game.awayTeamAvgPointsAgainst.toFixed(1)} PA
                    </div>
                  </div>
                </div>

                {/* Score Prediction */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  flex: '0 0 auto'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: homeWins ? '#666' : '#0066cc',
                    minWidth: '40px',
                    textAlign: 'right'
                  }}>
                    {game.predictedAwayScore}
                  </div>
                  <div style={{ fontSize: '1.2rem', color: '#999' }}>@</div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: homeWins ? '#0066cc' : '#666',
                    minWidth: '40px',
                    textAlign: 'left'
                  }}>
                    {game.predictedHomeScore}
                  </div>
                </div>

                {/* Home Team */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  flex: 1,
                  minWidth: '200px',
                  flexDirection: 'row-reverse',
                  textAlign: 'right'
                }}>
                  <Image
                    src={getTeamLogoPath(game.homeTeam)}
                    alt={`${game.homeTeam} logo`}
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Link
                      href={`/teams/${game.homeTeam.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ 
                        color: '#0066cc', 
                        textDecoration: 'none', 
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}
                    >
                      {game.homeTeam}
                    </Link>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                      Avg: {game.homeTeamAvgPointsFor.toFixed(1)} PF / {game.homeTeamAvgPointsAgainst.toFixed(1)} PA
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #ddd' }}>
                <CommentsBox gameId={game.id} />
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

