import Image from 'next/image'
import { Game } from '@/data/games'
import { getTeamLogoPath } from '@/lib/teamLogos'
import Link from 'next/link'

interface GameStatsProps {
  game: Game
}

export default function GameStats({ game }: GameStatsProps) {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
  
  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Score Header */}
      <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <Image
                src={getTeamLogoPath(game.homeTeam)}
                alt={`${game.homeTeam} logo`}
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
              <Link href={`/teams/${game.homeTeam.toLowerCase().replace(/\s+/g, '-')}`}>
                <h2 style={{ margin: 0 }}>{game.homeTeam}</h2>
              </Link>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{game.score.totalHome}</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>Coach: {game.homeCoach}</p>
          </div>
          <div style={{ fontSize: '1.5rem', padding: '0 2rem' }}>vs</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginBottom: '0.5rem' }}>
              <Link href={`/teams/${game.awayTeam.toLowerCase().replace(/\s+/g, '-')}`}>
                <h2 style={{ margin: 0 }}>{game.awayTeam}</h2>
              </Link>
              <Image
                src={getTeamLogoPath(game.awayTeam)}
                alt={`${game.awayTeam} logo`}
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{game.score.totalAway}</p>
            <p style={{ color: '#666', fontSize: '0.875rem' }}>Coach: {game.awayCoach}</p>
          </div>
        </div>
        
        {/* Quarter Scores */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem' }}>
            {quarters.map((q, idx) => (
              <div key={q} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>{q}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{game.score.home[idx]}</span>
                  <span style={{ color: '#999' }}>-</span>
                  <span style={{ fontWeight: 'bold' }}>{game.score.away[idx]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Home Team Stats */}
        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #0066cc', paddingBottom: '0.5rem' }}>
            {game.homeTeam} Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <strong>Kicking:</strong> <span>{game.homeStats.kicking}</span>
            </div>
            <div>
              <strong>Passing:</strong> <span>{game.homeStats.passing}</span>
            </div>
            <div>
              <strong>Rushing:</strong> <span>{game.homeStats.rushing}</span>
            </div>
            <div>
              <strong>Returns:</strong> <span>{game.homeStats.returns}</span>
            </div>
            <div>
              <strong>Calls:</strong> <span>{game.homeStats.calls}</span>
            </div>
          </div>
        </div>

        {/* Away Team Stats */}
        <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #0066cc', paddingBottom: '0.5rem' }}>
            {game.awayTeam} Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <strong>Kicking:</strong> <span>{game.awayStats.kicking}</span>
            </div>
            <div>
              <strong>Passing:</strong> <span>{game.awayStats.passing}</span>
            </div>
            <div>
              <strong>Rushing:</strong> <span>{game.awayStats.rushing}</span>
            </div>
            <div>
              <strong>Returns:</strong> <span>{game.awayStats.returns}</span>
            </div>
            <div>
              <strong>Calls:</strong> <span>{game.awayStats.calls}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

