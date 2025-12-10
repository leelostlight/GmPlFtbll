import { notFound } from 'next/navigation'
import GameStats from '@/components/GameStats'
import CommentsBox from '@/components/CommentsBox'
import { getGameById } from '@/data/games'

interface GamePageProps {
  params: {
    gameId: string
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameById(params.gameId)

  if (!game) {
    notFound()
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Game Details</h1>
      <GameStats game={game} />
      <CommentsBox gameId={params.gameId} />
    </main>
  )
}

