import { Game } from './games'
import { getAllGames } from './games'

export type ScheduleEntry = Game

export async function getSchedule(): Promise<ScheduleEntry[]> {
  const games = await getAllGames()
  
  // Games already have week property, so we can return them directly
  return games
}

