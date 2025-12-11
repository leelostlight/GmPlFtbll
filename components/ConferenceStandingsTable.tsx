import Image from 'next/image'
import type { ConferenceStandingsTable } from '@/data/standings'
import { getTeamLogoPath } from '@/lib/teamLogos'
import Link from 'next/link'

interface ConferenceStandingsTableProps {
  standings: ConferenceStandingsTable
}

export default function ConferenceStandingsTable({ standings }: ConferenceStandingsTableProps) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ marginTop: '40px', marginBottom: '1rem' }}>AFC</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '40px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Rank</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Team</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Coach</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>W</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>L</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>T</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>PF</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>PA</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Net</th>
          </tr>
        </thead>
        <tbody>
          {standings.AFC.map((team) => (
            <tr key={team.Team}>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Rank}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Image
                    src={getTeamLogoPath(team.Team)}
                    alt={`${team.Team} logo`}
                    width={30}
                    height={30}
                    style={{ objectFit: 'contain' }}
                  />
                  <Link 
                    href={`/teams/${team.Team.toLowerCase().replace(/\s+/g, '-')}`} 
                    style={{ color: '#0066cc', textDecoration: 'none' }}
                  >
                    {team.Team}
                  </Link>
                </div>
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Coach}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.W}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.L}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.T}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.PF}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.PA}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Net}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '40px', marginBottom: '1rem' }}>NFC</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '40px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Rank</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Team</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Coach</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>W</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>L</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>T</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>PF</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>PA</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Net</th>
          </tr>
        </thead>
        <tbody>
          {standings.NFC.map((team) => (
            <tr key={team.Team}>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Rank}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Image
                    src={getTeamLogoPath(team.Team)}
                    alt={`${team.Team} logo`}
                    width={30}
                    height={30}
                    style={{ objectFit: 'contain' }}
                  />
                  <Link 
                    href={`/teams/${team.Team.toLowerCase().replace(/\s+/g, '-')}`} 
                    style={{ color: '#0066cc', textDecoration: 'none' }}
                  >
                    {team.Team}
                  </Link>
                </div>
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Coach}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.W}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.L}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.T}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.PF}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.PA}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{team.Net}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

