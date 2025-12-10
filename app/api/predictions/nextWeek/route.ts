import { NextRequest, NextResponse } from 'next/server'

interface Prediction {
  id: string
  gameId: string
  predictedWinner: string
  confidence: number
  notes?: string
  timestamp: string
}

// In-memory storage - replace with a database in production
const predictionsStore: Prediction[] = []

export async function GET(request: NextRequest) {
  // In a real app, you might filter by week
  return NextResponse.json({ predictions: predictionsStore })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gameId, predictedWinner, confidence, notes } = body

    if (!gameId || !predictedWinner || confidence === undefined) {
      return NextResponse.json(
        { error: 'gameId, predictedWinner, and confidence are required' },
        { status: 400 }
      )
    }

    const newPrediction: Prediction = {
      id: Date.now().toString(),
      gameId,
      predictedWinner,
      confidence: Math.max(0, Math.min(100, confidence)), // Clamp between 0-100
      notes,
      timestamp: new Date().toISOString(),
    }

    predictionsStore.push(newPrediction)

    return NextResponse.json({ prediction: newPrediction }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prediction' },
      { status: 500 }
    )
  }
}

