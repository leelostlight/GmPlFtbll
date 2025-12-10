import { getAllGames, Game } from '../games'
import { teamDivisions } from '../teams'

// Helper function to parse stats strings
function parseStats(kicking: string, passing: string, rushing: string, returns: string, calls: string) {
  const result: any = {}
  
  // Parse kicking stats: "FG 2/2, EP 5/5, CP 0/0, Punt 5, 3rd 6/15, 4th 0/0, 1st 18"
  const fgMatch = kicking.match(/FG (\d+)\/(\d+)/)
  if (fgMatch) result.FG = `${fgMatch[1]}/${fgMatch[2]}`
  
  const epMatch = kicking.match(/EP (\d+)\/(\d+)/)
  if (epMatch) result.EP = `${epMatch[1]}/${epMatch[2]}`
  
  const cpMatch = kicking.match(/CP (\d+)\/(\d+)/)
  if (cpMatch) result.CP = `${cpMatch[1]}/${cpMatch[2]}`
  
  const puntMatch = kicking.match(/Punt (\d+)/)
  if (puntMatch) result.Punt = parseInt(puntMatch[1])
  
  const thirdDownMatch = kicking.match(/3rd (\d+)\/(\d+)/)
  if (thirdDownMatch) result.ThirdDown = `${thirdDownMatch[1]}/${thirdDownMatch[2]}`
  
  const fourthDownMatch = kicking.match(/4th (\d+)\/(\d+)/)
  if (fourthDownMatch) result.FourthDown = `${fourthDownMatch[1]}/${fourthDownMatch[2]}`
  
  const firstDownMatch = kicking.match(/1st (\d+)/)
  if (firstDownMatch) result.FirstDown = parseInt(firstDownMatch[1])
  
  // Parse passing stats: "Pass 15 for 23, 272 yds, Lg t38, 5 TD, 65%, In 0, Hrd 3, Skd 3"
  // Note: "Lg t38" means touchdown 38 yards, we need to extract just the number
  // Also handle cases without TD: "Pass 18 for 42, 263 yds, Lg 31, 43%, In 1, Hrd 22, Skd 2"
  const passMatch = passing.match(/Pass (\d+) for (\d+), (\d+) yds, Lg (?:t)?(\d+)(?:, (\d+) TD)?, (\d+)%, In (\d+), Hrd (\d+), Skd (\d+)/)
  if (passMatch) {
    result.Pass = {
      att: parseInt(passMatch[2]), // "15 for 23" - second number is attempts
      comp: parseInt(passMatch[1]), // "15 for 23" - first number is completions
      yds: parseInt(passMatch[3]),
      Lg: parseInt(passMatch[4]),
      TD: passMatch[5] ? parseInt(passMatch[5]) : 0,
      Pct: parseInt(passMatch[6]),
      Int: parseInt(passMatch[7]),
      Hrd: parseInt(passMatch[8]),
      Skd: parseInt(passMatch[9])
    }
  }
  
  // Parse rushing stats: "Rush 28 for 104 yds, Lg 10, avg 3.7, Fm 1, QB 1 for 4 yds"
  // or: "Rush 27 for 70 yds, Lg 12, 1 TD, avg 2.6, Fm 1, QB 1 for 6 yds"
  const rushMatch = rushing.match(/Rush (\d+) for (\d+) yds, Lg (?:t)?(\d+)(?:, (\d+) TD)?, avg ([\d.]+), Fm (\d+), QB (\d+) for (-?\d+) yds/)
  if (rushMatch) {
    result.Rush = {
      att: parseInt(rushMatch[1]),
      yds: parseInt(rushMatch[2]),
      Lg: parseInt(rushMatch[3]),
      TD: rushMatch[4] ? parseInt(rushMatch[4]) : 0,
      avg: parseFloat(rushMatch[5]),
      Fm: parseInt(rushMatch[6]),
      QB: parseInt(rushMatch[7])
    }
  }
  
  // Parse returns: "KR 4 for 98 yds, PR 4 for 44 yds, IntR 3 for 28 yds"
  // or: "KR 1 for 89 yds, 1 TD, PR 3 for 33 yds, FumR 1 for 18 yds"
  const krMatch = returns.match(/KR (\d+) for (\d+) yds(?:, (\d+) TD)?/)
  if (krMatch) {
    result.KR = {
      ret: parseInt(krMatch[1]),
      yds: parseInt(krMatch[2]),
      TD: krMatch[3] ? parseInt(krMatch[3]) : 0
    }
  }
  
  const prMatch = returns.match(/PR (\d+) for (\d+) yds(?:, (\d+) TD)?/)
  if (prMatch) {
    result.PR = {
      ret: parseInt(prMatch[1]),
      yds: parseInt(prMatch[2]),
      TD: prMatch[3] ? parseInt(prMatch[3]) : 0
    }
  }
  
  const intrMatch = returns.match(/IntR (\d+) for (\d+) yds(?:, (\d+) TD)?/)
  if (intrMatch) {
    result.IntR = {
      ret: parseInt(intrMatch[1]),
      yds: parseInt(intrMatch[2]),
      TD: intrMatch[3] ? parseInt(intrMatch[3]) : 0
    }
  }
  
  const fumrMatch = returns.match(/FumR (\d+) for (\d+) yds(?:, (\d+) TD)?/)
  if (fumrMatch) {
    result.FumR = {
      ret: parseInt(fumrMatch[1]),
      yds: parseInt(fumrMatch[2]),
      TD: fumrMatch[3] ? parseInt(fumrMatch[3]) : 0
    }
  }
  
  // Parse calls: "Fm J L, Run PW RO, Pass DL DP, Def GL DD"
  const callsMatch = calls.match(/Fm ([A-Z] [A-Z]), Run ([A-Z]+ [A-Z]+), Pass ([A-Z]+ [A-Z]+), Def ([A-Z]+ [A-Z]+)/)
  if (callsMatch) {
    result.Calls = {
      Fm: callsMatch[1],
      Run: callsMatch[2],
      Pass: callsMatch[3],
      Def: callsMatch[4]
    }
  }
  
  return result
}

interface TeamGame {
  opponent: string
  opponentCoach: string
  score: { self: number; opponent: number }
  quarters: number[]
  stats: any
}

interface TeamStanding {
  team: string
  coach: string
  W: number
  L: number
  T: number
  FOR: number
  AGN: number
  Div: string
  Streak: string
  games: TeamGame[]
}

interface DivisionStanding {
  [division: string]: TeamStanding[]
}

interface ConferenceStanding {
  [conference: string]: DivisionStanding
}

export interface EnhancedStandings {
  [conference: string]: {
    [division: string]: TeamStanding[]
  }
}

function calculateStreak(games: TeamGame[]): string {
  if (games.length === 0) return ''
  
  let streak = 0
  let isWin = false
  
  // Go through games in reverse order (most recent first)
  for (let i = games.length - 1; i >= 0; i--) {
    const game = games[i]
    const won = game.score.self > game.score.opponent
    const lost = game.score.self < game.score.opponent
    
    if (i === games.length - 1) {
      // First game determines streak type
      isWin = won
      streak = 1
    } else {
      // Continue streak if same result
      if ((isWin && won) || (!isWin && lost)) {
        streak++
      } else {
        break
      }
    }
  }
  
  return isWin ? `W${streak}` : `L${streak}`
}

function calculateDivisionRecord(teamName: string, games: TeamGame[]): string {
  const division = teamDivisions[teamName]?.division
  if (!division) return '0-0'
  
  let divWins = 0
  let divLosses = 0
  
  games.forEach(game => {
    const opponentDivision = teamDivisions[game.opponent]?.division
    if (opponentDivision === division) {
      if (game.score.self > game.score.opponent) {
        divWins++
      } else if (game.score.self < game.score.opponent) {
        divLosses++
      }
    }
  })
  
  return `${divWins}-${divLosses}`
}

export async function getEnhancedStandings(): Promise<EnhancedStandings> {
  const games = await getAllGames()
  const teamMap = new Map<string, {
    team: string
    coach: string
    games: TeamGame[]
    wins: number
    losses: number
    ties: number
    pointsFor: number
    pointsAgainst: number
  }>()
  
  // Process all games
  games.forEach(game => {
    // Process home team
    if (!teamMap.has(game.homeTeam)) {
      teamMap.set(game.homeTeam, {
        team: game.homeTeam,
        coach: game.homeCoach,
        games: [],
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0
      })
    }
    const homeTeam = teamMap.get(game.homeTeam)!
    
    // Process away team
    if (!teamMap.has(game.awayTeam)) {
      teamMap.set(game.awayTeam, {
        team: game.awayTeam,
        coach: game.awayCoach,
        games: [],
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0
      })
    }
    const awayTeam = teamMap.get(game.awayTeam)!
    
    // Add game for home team
    const homeGame: TeamGame = {
      opponent: game.awayTeam,
      opponentCoach: game.awayCoach,
      score: { self: game.score.totalHome, opponent: game.score.totalAway },
      quarters: game.score.home,
      stats: parseStats(
        game.homeStats.kicking,
        game.homeStats.passing,
        game.homeStats.rushing,
        game.homeStats.returns,
        game.homeStats.calls
      )
    }
    homeTeam.games.push(homeGame)
    homeTeam.pointsFor += game.score.totalHome
    homeTeam.pointsAgainst += game.score.totalAway
    
    // Add game for away team
    const awayGame: TeamGame = {
      opponent: game.homeTeam,
      opponentCoach: game.homeCoach,
      score: { self: game.score.totalAway, opponent: game.score.totalHome },
      quarters: game.score.away,
      stats: parseStats(
        game.awayStats.kicking,
        game.awayStats.passing,
        game.awayStats.rushing,
        game.awayStats.returns,
        game.awayStats.calls
      )
    }
    awayTeam.games.push(awayGame)
    awayTeam.pointsFor += game.score.totalAway
    awayTeam.pointsAgainst += game.score.totalHome
    
    // Update wins/losses
    if (game.score.totalHome > game.score.totalAway) {
      homeTeam.wins++
      awayTeam.losses++
    } else if (game.score.totalAway > game.score.totalHome) {
      awayTeam.wins++
      homeTeam.losses++
    } else {
      homeTeam.ties++
      awayTeam.ties++
    }
  })
  
  // Build standings structure
  const standings: EnhancedStandings = {
    AFC: {
      East: [],
      Central: [],
      West: []
    },
    NFC: {
      East: [],
      Central: [],
      South: []
    }
  }
  
  // Group teams by conference and division
  teamMap.forEach((teamData, teamName) => {
    const division = teamDivisions[teamName]
    if (!division) return
    
    const standing: TeamStanding = {
      team: teamName,
      coach: teamData.coach,
      W: teamData.wins,
      L: teamData.losses,
      T: teamData.ties,
      FOR: teamData.pointsFor,
      AGN: teamData.pointsAgainst,
      Div: calculateDivisionRecord(teamName, teamData.games),
      Streak: calculateStreak(teamData.games),
      games: teamData.games
    }
    
    standings[division.conference][division.division].push(standing)
  })
  
  // Sort teams within each division by win percentage, then wins
  Object.keys(standings).forEach(conference => {
    Object.keys(standings[conference]).forEach(division => {
      standings[conference][division].sort((a, b) => {
        const aWinPct = a.W / (a.W + a.L + a.T)
        const bWinPct = b.W / (b.W + b.L + b.T)
        if (bWinPct !== aWinPct) {
          return bWinPct - aWinPct
        }
        return b.W - a.W
      })
    })
  })
  
  return standings
}

