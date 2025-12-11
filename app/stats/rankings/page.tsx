import { getTeamDetailedStats } from '@/data/teamStats'
import Image from 'next/image'
import Link from 'next/link'
import { getTeamLogoPath } from '@/lib/teamLogos'

export default async function RankingsPage() {
  const teamStats = await getTeamDetailedStats()

  // Filter out Washington Commanders
  const filteredTeamStats = teamStats.filter(team => team.team !== 'Washington Commanders')

  // Sort teams by different criteria
  const totalOffenseRankings = [...filteredTeamStats].sort((a, b) => 
    b.offense.totalOffenseYards - a.offense.totalOffenseYards
  )

  const passingYardsRankings = [...filteredTeamStats].sort((a, b) => 
    b.offense.passingYards - a.offense.passingYards
  )

  const rushingYardsRankings = [...filteredTeamStats].sort((a, b) => 
    b.offense.rushingYards - a.offense.rushingYards
  )

  const defensiveYardsRankings = [...filteredTeamStats].sort((a, b) => 
    a.defense.totalOffenseYardsAllowed - b.defense.totalOffenseYardsAllowed
  ) // Lower is better for defense

  const defensivePassingYardsRankings = [...filteredTeamStats].sort((a, b) => 
    a.defense.passingYardsAllowed - b.defense.passingYardsAllowed
  ) // Lower is better for defense

  const defensiveRushingYardsRankings = [...filteredTeamStats].sort((a, b) => 
    a.defense.rushingYardsAllowed - b.defense.rushingYardsAllowed
  ) // Lower is better for defense

  const renderRankingTable = (
    title: string,
    rankings: typeof teamStats,
    getValue: (team: typeof teamStats[0]) => number,
    formatValue: (value: number) => string,
    isDefense: boolean = false
  ) => {
    return (
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0066cc' }}>
          {title}
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Rank</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Team</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Conference</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>Division</th>
                <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>
                  {title.replace(' Rankings', '')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((team, index) => {
                const value = getValue(team)
                return (
                  <tr key={team.team} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd', fontWeight: 'bold' }}>
                      {index + 1}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Image
                          src={getTeamLogoPath(team.team)}
                          alt={`${team.team} logo`}
                          width={30}
                          height={30}
                          style={{ objectFit: 'contain' }}
                        />
                        <Link
                          href={`/teams/${team.team.toLowerCase().replace(/\s+/g, '-')}`}
                          style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}
                        >
                          {team.team}
                        </Link>
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>
                      {team.conference}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #ddd' }}>
                      {team.division}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right', 
                      border: '1px solid #ddd',
                      fontWeight: 'bold',
                      color: isDefense ? (index < 5 ? '#0066cc' : '#333') : (index < 5 ? '#0066cc' : '#333')
                    }}>
                      {formatValue(value)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <main style={{ padding: '20px', paddingTop: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Team Statistics Rankings</h1>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #ddd'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          <strong>Note:</strong> Rankings are based on cumulative statistics from all games played. 
          For defensive rankings, lower values indicate better performance.
        </p>
      </div>

      {/* Offensive Rankings */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1a1a1a' }}>
          Offensive Rankings
        </h2>
        
        {renderRankingTable(
          'Total Offense Yards Rankings',
          totalOffenseRankings,
          (team) => team.offense.totalOffenseYards,
          (value) => value.toLocaleString()
        )}

        {renderRankingTable(
          'Passing Yards Rankings',
          passingYardsRankings,
          (team) => team.offense.passingYards,
          (value) => value.toLocaleString()
        )}

        {renderRankingTable(
          'Rushing Yards Rankings',
          rushingYardsRankings,
          (team) => team.offense.rushingYards,
          (value) => value.toLocaleString()
        )}
      </div>

      {/* Defensive Rankings */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1a1a1a' }}>
          Defensive Rankings
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
          <em>Note: Lower values indicate better defensive performance (fewer yards allowed)</em>
        </p>
        
        {renderRankingTable(
          'Total Yards Allowed Rankings',
          defensiveYardsRankings,
          (team) => team.defense.totalOffenseYardsAllowed,
          (value) => value.toLocaleString(),
          true
        )}

        {renderRankingTable(
          'Passing Yards Allowed Rankings',
          defensivePassingYardsRankings,
          (team) => team.defense.passingYardsAllowed,
          (value) => value.toLocaleString(),
          true
        )}

        {renderRankingTable(
          'Rushing Yards Allowed Rankings',
          defensiveRushingYardsRankings,
          (team) => team.defense.rushingYardsAllowed,
          (value) => value.toLocaleString(),
          true
        )}
      </div>
    </main>
  )
}

