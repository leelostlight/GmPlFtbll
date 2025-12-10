import { NextRequest, NextResponse } from 'next/server'

interface Comment {
  id: string
  author: string
  text: string
  timestamp: string
}

// In-memory storage - replace with a database in production
const commentsStore: Record<string, Comment[]> = {}

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params
  const comments = commentsStore[gameId] || []
  
  return NextResponse.json({ comments })
}

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params
    const body = await request.json()
    const { author, text } = body

    if (!author || !text) {
      return NextResponse.json(
        { error: 'Author and text are required' },
        { status: 400 }
      )
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author,
      text,
      timestamp: new Date().toISOString(),
    }

    if (!commentsStore[gameId]) {
      commentsStore[gameId] = []
    }

    commentsStore[gameId].push(newComment)

    return NextResponse.json({ comment: newComment }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

