'use client'

import { useState } from 'react'
import ConferenceStandingsTable from './ConferenceStandingsTable'
import StandingsTable from './StandingsTable'
import { ConferenceStandingsTable as ConferenceStandingsType, StandingsData } from '@/data/standings'

interface StandingsTabsProps {
  conferenceStandings: ConferenceStandingsType
  divisionalStandings: StandingsData
}

export default function StandingsTabs({ conferenceStandings, divisionalStandings }: StandingsTabsProps) {
  const [activeTab, setActiveTab] = useState<'conference' | 'divisional'>('divisional')

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '0',
        marginBottom: '2rem',
        borderBottom: '2px solid #ddd'
      }}>
        <button
          onClick={() => setActiveTab('conference')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: activeTab === 'conference' ? '#0066cc' : '#f5f5f5',
            color: activeTab === 'conference' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginRight: '4px'
          }}
        >
          Conference Standings
        </button>
        <button
          onClick={() => setActiveTab('divisional')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: activeTab === 'divisional' ? '#0066cc' : '#f5f5f5',
            color: activeTab === 'divisional' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px'
          }}
        >
          Divisional Standings
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'conference' && (
          <ConferenceStandingsTable standings={conferenceStandings} />
        )}

        {activeTab === 'divisional' && (
          <StandingsTable standings={divisionalStandings} />
        )}
      </div>
    </div>
  )
}

