import { Team } from '@/data/teams'
import Link from 'next/link'

interface TeamStatsProps {
  team: Team
}

export default function TeamStats({ team }: TeamStatsProps) {
  const winPercentage = (team.wins / (team.wins + team.losses + (team.ties || 0))) * 100
  const pointDifferential = team.pointsFor - team.pointsAgainst

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{team.name}</h2>
      
      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <h3>Record</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {team.wins} - {team.losses}
            {team.ties !== undefined && team.ties > 0 && ` - ${team.ties}`}
          </p>
          <p>Win Percentage: {winPercentage.toFixed(1)}%</p>
        </div>
        
        <div>
          <h3>Points</h3>
          <p>Points For: {team.pointsFor}</p>
          <p>Points Against: {team.pointsAgainst}</p>
          <p>Differential: {pointDifferential > 0 ? '+' : ''}{pointDifferential}</p>
        </div>
        
        {(team.conference || team.division) && (
          <div>
            <h3>Division</h3>
            {team.conference && <p>Conference: {team.conference}</p>}
            {team.division && <p>Division: {team.division}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

