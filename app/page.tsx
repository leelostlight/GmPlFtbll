'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Image
          src="/assets/images/futuristic-football-soccer-player-with-glowing.jpeg"
          alt="Game Plan League"
          width={1200}
          height={400}
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '8px',
            objectFit: 'cover'
          }}
          priority
        />
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link 
            href="/schedule" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#FF6600',
              color: '#000000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8533'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6600'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Games
          </Link>
          <Link 
            href="/standings" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#FF6600',
              color: '#000000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8533'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6600'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Standings
          </Link>
          <Link 
            href="/teams" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#FF6600',
              color: '#000000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8533'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6600'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Teams
          </Link>
          <Link 
            href="/team-statistics" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#FF6600',
              color: '#000000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8533'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6600'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Team Statistics
          </Link>
          <Link 
            href="/stats/rankings" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#FF6600',
              color: '#000000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8533'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6600'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Rankings
          </Link>
        </div>
      </div>
      <h1>Game Plan</h1>
    </main>
  )
}

