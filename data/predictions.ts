import { getAllTeams } from './teams'
import { getTeamDetailedStats } from './teamStats'
import { NextWeekGame } from './nextWeekSchedule'

export interface PredictedGame extends NextWeekGame {
  predictedHomeScore: number
  predictedAwayScore: number
  homeTeamAvgPointsFor: number
  homeTeamAvgPointsAgainst: number
  awayTeamAvgPointsFor: number
  awayTeamAvgPointsAgainst: number
}

/**
 * Predicts game scores based on team statistics
 * Uses a combination of:
 * - Average points scored
 * - Average points allowed by opponent
 * - Offensive and defensive efficiency
 */
export async function predictGameScores(games: NextWeekGame[]): Promise<PredictedGame[]> {
  const teams = await getAllTeams()
  const detailedStats = await getTeamDetailedStats()
  
  // Create maps for quick lookup
  const teamMap = new Map<string, typeof teams[0]>()
  teams.forEach(team => {
    teamMap.set(team.name, team)
  })
  
  const statsMap = new Map<string, typeof detailedStats[0]>()
  detailedStats.forEach(stat => {
    statsMap.set(stat.team, stat)
  })
  
  return games.map(game => {
    const homeTeam = teamMap.get(game.homeTeam)
    const awayTeam = teamMap.get(game.awayTeam)
    const homeStats = statsMap.get(game.homeTeam)
    const awayStats = statsMap.get(game.awayTeam)
    
    if (!homeTeam || !awayTeam) {
      // Fallback if team not found
      return {
        ...game,
        predictedHomeScore: 20,
        predictedAwayScore: 20,
        homeTeamAvgPointsFor: 0,
        homeTeamAvgPointsAgainst: 0,
        awayTeamAvgPointsFor: 0,
        awayTeamAvgPointsAgainst: 0
      }
    }
    
    // Calculate games played
    const homeGamesPlayed = homeTeam.wins + homeTeam.losses + (homeTeam.ties || 0)
    const awayGamesPlayed = awayTeam.wins + awayTeam.losses + (awayTeam.ties || 0)
    
    // Average points for and against per game
    const homeAvgPointsFor = homeGamesPlayed > 0 ? homeTeam.pointsFor / homeGamesPlayed : 0
    const homeAvgPointsAgainst = homeGamesPlayed > 0 ? homeTeam.pointsAgainst / homeGamesPlayed : 0
    const awayAvgPointsFor = awayGamesPlayed > 0 ? awayTeam.pointsFor / awayGamesPlayed : 0
    const awayAvgPointsAgainst = awayGamesPlayed > 0 ? awayTeam.pointsAgainst / awayGamesPlayed : 0
    
    // Simple prediction formula:
    // Predicted score = (team's avg points for + opponent's avg points allowed) / 2
    // Then add a small home field advantage (3 points for home team)
    const homeBaseScore = (homeAvgPointsFor + awayAvgPointsAgainst) / 2
    const homePredictedScore = Math.round(homeBaseScore + 3) // Home field advantage
    
    const awayBaseScore = (awayAvgPointsFor + homeAvgPointsAgainst) / 2
    const awayPredictedScore = Math.round(awayBaseScore)
    
    // Ensure scores are reasonable (between 0 and 60)
    const finalHomeScore = Math.max(0, Math.min(60, homePredictedScore))
    const finalAwayScore = Math.max(0, Math.min(60, awayPredictedScore))
    
    return {
      ...game,
      predictedHomeScore: finalHomeScore,
      predictedAwayScore: finalAwayScore,
      homeTeamAvgPointsFor: homeAvgPointsFor,
      homeTeamAvgPointsAgainst: homeAvgPointsAgainst,
      awayTeamAvgPointsFor: awayAvgPointsFor,
      awayTeamAvgPointsAgainst: awayAvgPointsAgainst
    }
  })
}

