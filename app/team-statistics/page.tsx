import Image from 'next/image'
import Link from 'next/link'
import { getAllTeams } from '@/data/teams'
import { getEnhancedStandings } from '@/data/standings'
import { getTeamDetailedStats } from '@/data/teamStats'
import { getTeamLogoPath, getConferenceLogoPath } from '@/lib/teamLogos'

export default async function TeamStatisticsPage() {
  const teams = await getAllTeams()
  const enhancedStandings = await getEnhancedStandings()
  const detailedStats = await getTeamDetailedStats()
  
  // Create a map of team names to their detailed stats
  const detailedStatsMap = new Map<string, typeof detailedStats[0]>()
  detailedStats.forEach(stat => {
    detailedStatsMap.set(stat.team, stat)
  })
  
  // Create a map of team names to their enhanced data
  const teamDataMap = new Map<string, any>()
  Object.values(enhancedStandings).forEach(conference => {
    Object.values(conference).forEach(division => {
      division.forEach(teamData => {
        teamDataMap.set(teamData.team, teamData)
      })
    })
  })

  // Group teams by conference
  const teamsByConference = {
    AFC: teams.filter(t => t.conference === 'AFC').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses + (a.ties || 0))
      const bWinPct = b.wins / (b.wins + b.losses + (b.ties || 0))
      return bWinPct - aWinPct
    }),
    NFC: teams.filter(t => t.conference === 'NFC').sort((a, b) => {
      const aWinPct = a.wins / (a.wins + a.losses + (a.ties || 0))
      const bWinPct = b.wins / (b.wins + b.losses + (b.ties || 0))
      return bWinPct - aWinPct
    })
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Team Statistics</h1>
      
      {/* AFC Section */}
      <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>AFC</h2>
          {getConferenceLogoPath('AFC') && (
            <Image
              src={getConferenceLogoPath('AFC')}
              alt="AFC logo"
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '1.5rem' }}>
          {teamsByConference.AFC.map((team) => {
            const enhancedData = teamDataMap.get(team.name)
            const winPercentage = (team.wins / (team.wins + team.losses + (team.ties || 0))) * 100
            const netPoints = team.pointsFor - team.pointsAgainst
            
            return (
              <div 
                key={team.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <Image
                    src={getTeamLogoPath(team.name)}
                    alt={`${team.name} logo`}
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link 
                      href={`/teams/${team.id}`}
                      style={{ color: '#0066cc', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold' }}
                    >
                      {team.name}
                    </Link>
                    {enhancedData && (
                      <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                        Coach: {enhancedData.coach}
                      </p>
                    )}
                    <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                      {team.division} Division
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <div>
                    <strong>Record:</strong> {team.wins} - {team.losses}
                    {team.ties !== undefined && team.ties > 0 && ` - ${team.ties}`}
                    <br />
                    <strong>Win %:</strong> {winPercentage.toFixed(1)}%
                    {enhancedData && (
                      <>
                        <br />
                        <strong>Streak:</strong> {enhancedData.Streak}
                        <br />
                        <strong>Div Record:</strong> {enhancedData.Div}
                      </>
                    )}
                  </div>
                  <div>
                    <strong>Points For:</strong> {team.pointsFor}
                    <br />
                    <strong>Points Against:</strong> {team.pointsAgainst}
                    <br />
                    <strong>Net Points:</strong> 
                    <span style={{ color: netPoints > 0 ? 'green' : netPoints < 0 ? 'red' : 'black' }}>
                      {netPoints > 0 ? ' +' : ' '}{netPoints}
                    </span>
                  </div>
                </div>
                
                {(() => {
                  const stats = detailedStatsMap.get(team.name)
                  if (!stats) return null
                  
                  return (
                    <>
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #ddd' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#0066cc' }}>
                          Offense
                        </h3>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <div><strong>Total Offense Yards:</strong> {stats.offense.totalOffenseYards.toLocaleString()}</div>
                          <div><strong>Passing Yards:</strong> {stats.offense.passingYards.toLocaleString()}</div>
                          <div><strong>Yards/Pass Att:</strong> {stats.offense.yardsPerPassAttempt.toFixed(2)}</div>
                          <div><strong>Yards/Pass Comp:</strong> {stats.offense.yardsPerPassCompletion.toFixed(2)}</div>
                          <div><strong>Passing TDs:</strong> {stats.offense.passingTDs}</div>
                          <div><strong>Interceptions:</strong> {stats.offense.interceptions}</div>
                          <div><strong>Times Sacked:</strong> {stats.offense.timesSacked}</div>
                          <div><strong>Rushing Yards:</strong> {stats.offense.rushingYards.toLocaleString()}</div>
                          <div><strong>Avg Rush Yards:</strong> {stats.offense.avgRushYards.toFixed(2)}</div>
                          <div><strong>Rushing TDs:</strong> {stats.offense.rushingTDs}</div>
                          <div><strong>Fumbles:</strong> {stats.offense.fumbles}</div>
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #ddd' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#cc0000' }}>
                          Defense
                        </h3>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <div><strong>Total Yards Allowed:</strong> {stats.defense.totalOffenseYardsAllowed.toLocaleString()}</div>
                          <div><strong>Passing Yards Allowed:</strong> {stats.defense.passingYardsAllowed.toLocaleString()}</div>
                          <div><strong>Yards/Pass Att Allowed:</strong> {stats.defense.yardsPerPassAttemptAllowed.toFixed(2)}</div>
                          <div><strong>Yards/Pass Comp Allowed:</strong> {stats.defense.yardsPerPassCompletionAllowed.toFixed(2)}</div>
                          <div><strong>Passing TDs Allowed:</strong> {stats.defense.passingTDsAllowed}</div>
                          <div><strong>Interceptions Forced:</strong> {stats.defense.interceptionsForced}</div>
                          <div><strong>Sacks:</strong> {stats.defense.sacks}</div>
                          <div><strong>Rushing Yards Allowed:</strong> {stats.defense.rushingYardsAllowed.toLocaleString()}</div>
                          <div><strong>Avg Rush Yards Allowed:</strong> {stats.defense.avgRushYardsAllowed.toFixed(2)}</div>
                          <div><strong>Rushing TDs Allowed:</strong> {stats.defense.rushingTDsAllowed}</div>
                          <div><strong>Fumbles Forced:</strong> {stats.defense.fumblesForced}</div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>

      {/* NFC Section */}
      <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>NFC</h2>
          {getConferenceLogoPath('NFC') && (
            <Image
              src={getConferenceLogoPath('NFC')}
              alt="NFC logo"
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '1.5rem' }}>
          {teamsByConference.NFC.map((team) => {
            const enhancedData = teamDataMap.get(team.name)
            const winPercentage = (team.wins / (team.wins + team.losses + (team.ties || 0))) * 100
            const netPoints = team.pointsFor - team.pointsAgainst
            
            return (
              <div 
                key={team.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <Image
                    src={getTeamLogoPath(team.name)}
                    alt={`${team.name} logo`}
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link 
                      href={`/teams/${team.id}`}
                      style={{ color: '#0066cc', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold' }}
                    >
                      {team.name}
                    </Link>
                    {enhancedData && (
                      <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                        Coach: {enhancedData.coach}
                      </p>
                    )}
                    <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                      {team.division} Division
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <div>
                    <strong>Record:</strong> {team.wins} - {team.losses}
                    {team.ties !== undefined && team.ties > 0 && ` - ${team.ties}`}
                    <br />
                    <strong>Win %:</strong> {winPercentage.toFixed(1)}%
                    {enhancedData && (
                      <>
                        <br />
                        <strong>Streak:</strong> {enhancedData.Streak}
                        <br />
                        <strong>Div Record:</strong> {enhancedData.Div}
                      </>
                    )}
                  </div>
                  <div>
                    <strong>Points For:</strong> {team.pointsFor}
                    <br />
                    <strong>Points Against:</strong> {team.pointsAgainst}
                    <br />
                    <strong>Net Points:</strong> 
                    <span style={{ color: netPoints > 0 ? 'green' : netPoints < 0 ? 'red' : 'black' }}>
                      {netPoints > 0 ? ' +' : ' '}{netPoints}
                    </span>
                  </div>
                </div>
                
                {(() => {
                  const stats = detailedStatsMap.get(team.name)
                  if (!stats) return null
                  
                  return (
                    <>
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #ddd' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#0066cc' }}>
                          Offense
                        </h3>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <div><strong>Total Offense Yards:</strong> {stats.offense.totalOffenseYards.toLocaleString()}</div>
                          <div><strong>Passing Yards:</strong> {stats.offense.passingYards.toLocaleString()}</div>
                          <div><strong>Yards/Pass Att:</strong> {stats.offense.yardsPerPassAttempt.toFixed(2)}</div>
                          <div><strong>Yards/Pass Comp:</strong> {stats.offense.yardsPerPassCompletion.toFixed(2)}</div>
                          <div><strong>Passing TDs:</strong> {stats.offense.passingTDs}</div>
                          <div><strong>Interceptions:</strong> {stats.offense.interceptions}</div>
                          <div><strong>Times Sacked:</strong> {stats.offense.timesSacked}</div>
                          <div><strong>Rushing Yards:</strong> {stats.offense.rushingYards.toLocaleString()}</div>
                          <div><strong>Avg Rush Yards:</strong> {stats.offense.avgRushYards.toFixed(2)}</div>
                          <div><strong>Rushing TDs:</strong> {stats.offense.rushingTDs}</div>
                          <div><strong>Fumbles:</strong> {stats.offense.fumbles}</div>
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #ddd' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold', color: '#cc0000' }}>
                          Defense
                        </h3>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)', 
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <div><strong>Total Yards Allowed:</strong> {stats.defense.totalOffenseYardsAllowed.toLocaleString()}</div>
                          <div><strong>Passing Yards Allowed:</strong> {stats.defense.passingYardsAllowed.toLocaleString()}</div>
                          <div><strong>Yards/Pass Att Allowed:</strong> {stats.defense.yardsPerPassAttemptAllowed.toFixed(2)}</div>
                          <div><strong>Yards/Pass Comp Allowed:</strong> {stats.defense.yardsPerPassCompletionAllowed.toFixed(2)}</div>
                          <div><strong>Passing TDs Allowed:</strong> {stats.defense.passingTDsAllowed}</div>
                          <div><strong>Interceptions Forced:</strong> {stats.defense.interceptionsForced}</div>
                          <div><strong>Sacks:</strong> {stats.defense.sacks}</div>
                          <div><strong>Rushing Yards Allowed:</strong> {stats.defense.rushingYardsAllowed.toLocaleString()}</div>
                          <div><strong>Avg Rush Yards Allowed:</strong> {stats.defense.avgRushYardsAllowed.toFixed(2)}</div>
                          <div><strong>Rushing TDs Allowed:</strong> {stats.defense.rushingTDsAllowed}</div>
                          <div><strong>Fumbles Forced:</strong> {stats.defense.fumblesForced}</div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

