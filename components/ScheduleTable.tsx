import { ScheduleEntry } from '@/data/schedule'
import Link from 'next/link'

interface ScheduleTableProps {
  schedule: ScheduleEntry[]
  showScores: boolean
}

export default function ScheduleTable({ schedule, showScores }: ScheduleTableProps) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Week</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Away Team</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Home Team</th>
              <th style={{ padding: '0.75rem', textAlign: 'center' }}>Score</th>
              <th style={{ padding: '0.75rem', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((game) => (
              <tr key={game.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>
                  Week {game.week}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <Link href={`/teams/${game.awayTeam.toLowerCase().replace(/\s+/g, '-')}`}>
                    {game.awayTeam}
                  </Link>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <Link href={`/teams/${game.homeTeam.toLowerCase().replace(/\s+/g, '-')}`}>
                    {game.homeTeam}
                  </Link>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 'bold' }}>
                  {showScores ? (
                    `${game.score.totalAway} - ${game.score.totalHome}`
                  ) : (
                    <span style={{ color: '#999' }}>—</span>
                  )}
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <Link href={`/games/${game.id}`} style={{ color: '#0066cc' }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

