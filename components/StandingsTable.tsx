import Image from 'next/image'
import { StandingsData } from '@/data/standings'
import { getTeamLogoPath, getConferenceLogoPath } from '@/lib/teamLogos'
import Link from 'next/link'

interface StandingsTableProps {
  standings: StandingsData
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div style={{ marginTop: '2rem' }}>
      {standings.conferences.map((conference) => (
        <div key={conference.conference} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1a1a1a' }}>
              {conference.conference}
            </h2>
            {getConferenceLogoPath(conference.conference) && (
              <Image
                src={getConferenceLogoPath(conference.conference)}
                alt={`${conference.conference} logo`}
                width={60}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {conference.divisions.map((division) => (
              <div key={`${conference.conference}-${division.division}`} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#f5f5f5', padding: '0.75rem', borderBottom: '2px solid #ddd', fontWeight: 'bold' }}>
                  {division.division}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#fafafa' }}>
                      <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.875rem' }}>Team</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>W</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>L</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>T</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>Win %</th>
                      <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.875rem' }}>GB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {division.teams.map((team, index) => (
                      <tr key={team.id} style={{ borderBottom: index < division.teams.length - 1 ? '1px solid #eee' : 'none' }}>
                        <td style={{ padding: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Image
                              src={getTeamLogoPath(team.name)}
                              alt={`${team.name} logo`}
                              width={24}
                              height={24}
                              style={{ objectFit: 'contain' }}
                            />
                            <Link href={`/teams/${team.id}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                              {team.name}
                            </Link>
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>{team.wins}</td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>{team.losses}</td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>{team.ties || 0}</td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          {(team.winPercentage * 100).toFixed(1)}%
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          {team.gamesBack && team.gamesBack > 0 ? team.gamesBack.toFixed(1) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

