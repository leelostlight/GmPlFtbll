'use client'

import { useState, useEffect } from 'react'

interface Prediction {
  id: string
  gameId: string
  predictedWinner: string
  confidence: number
  notes?: string
  timestamp: string
}

interface PredictionWidgetProps {
  week?: number
}

export default function PredictionWidget({ week }: PredictionWidgetProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [newPrediction, setNewPrediction] = useState({
    gameId: '',
    predictedWinner: '',
    confidence: 50,
    notes: '',
  })

  useEffect(() => {
    fetchPredictions()
  }, [week])

  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/predictions/nextWeek')
      if (response.ok) {
        const data = await response.json()
        setPredictions(data.predictions || [])
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPrediction.gameId || !newPrediction.predictedWinner) return

    try {
      const response = await fetch('/api/predictions/nextWeek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrediction),
      })

      if (response.ok) {
        setNewPrediction({
          gameId: '',
          predictedWinner: '',
          confidence: 50,
          notes: '',
        })
        fetchPredictions()
      }
    } catch (error) {
      console.error('Failed to submit prediction:', error)
    }
  }

  if (loading) {
    return <div>Loading predictions...</div>
  }

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Predictions {week && `- Week ${week}`}</h2>
      
      <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
        {predictions.length === 0 ? (
          <p style={{ color: '#666' }}>No predictions yet.</p>
        ) : (
          predictions.map((prediction) => (
            <div key={prediction.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Game {prediction.gameId}</strong>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>
                  {new Date(prediction.timestamp).toLocaleString()}
                </span>
              </div>
              <p><strong>Predicted Winner:</strong> {prediction.predictedWinner}</p>
              <p><strong>Confidence:</strong> {prediction.confidence}%</p>
              {prediction.notes && <p><strong>Notes:</strong> {prediction.notes}</p>}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
        <h3>Make a Prediction</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Game ID"
            value={newPrediction.gameId}
            onChange={(e) => setNewPrediction({ ...newPrediction, gameId: e.target.value })}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Predicted Winner"
            value={newPrediction.predictedWinner}
            onChange={(e) => setNewPrediction({ ...newPrediction, predictedWinner: e.target.value })}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <div>
            <label>
              Confidence: {newPrediction.confidence}%
              <input
                type="range"
                min="0"
                max="100"
                value={newPrediction.confidence}
                onChange={(e) => setNewPrediction({ ...newPrediction, confidence: parseInt(e.target.value) })}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
            </label>
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={newPrediction.notes}
            onChange={(e) => setNewPrediction({ ...newPrediction, notes: e.target.value })}
            rows={3}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit Prediction
          </button>
        </div>
      </form>
    </div>
  )
}

