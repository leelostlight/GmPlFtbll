'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScheduleEntry } from '@/data/schedule'
import ScheduleTable from './ScheduleTable'

interface SchedulePageClientProps {
  schedule: ScheduleEntry[]
  week?: number
}

export default function SchedulePageClient({ schedule, week = 1 }: SchedulePageClientProps) {
  // Hide scores by default - user must click "Show Scores" button
  const [showScores, setShowScores] = useState(false)

  return (
    <>
      {week === 1 && (
        <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
          <Link 
            href="/schedule/week-2"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0066cc',
              color: '#FFFFFF',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'inline-block',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              marginRight: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0052a3'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0066cc'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            View Week 2 Results →
          </Link>
          <Link 
            href="/schedule/next-week"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0066cc',
              color: '#FFFFFF',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'inline-block',
              border: '2px solid #000000',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0052a3'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0066cc'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            View Week 3 Schedule & Predictions →
          </Link>
        </div>
      )}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Image
          src="/assets/images/schedule-scores-payton.jpg"
          alt="Games"
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
        <h1 style={{
          position: 'absolute',
          top: '2rem',
          left: '10rem',
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          margin: 0
        }}>
          Week {week} Results
        </h1>
        <button
          onClick={() => setShowScores(!showScores)}
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: showScores ? '#0066cc' : '#CC0000',
            color: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {showScores ? 'Hide Scores' : 'Show Scores'}
        </button>
      </div>
      <ScheduleTable schedule={schedule} showScores={showScores} />
    </>
  )
}

