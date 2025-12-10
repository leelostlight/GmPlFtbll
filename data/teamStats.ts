import { getAllGames } from './games'
import { teamDivisions } from './teams'

export interface TeamOffensiveStats {
  totalOffenseYards: number
  passingYards: number
  yardsPerPassAttempt: number
  yardsPerPassCompletion: number
  passingTDs: number
  interceptions: number
  timesSacked: number
  rushingYards: number
  avgRushYards: number
  rushingTDs: number
  fumbles: number
}

export interface TeamDefensiveStats {
  totalOffenseYardsAllowed: number
  passingYardsAllowed: number
  yardsPerPassAttemptAllowed: number
  yardsPerPassCompletionAllowed: number
  passingTDsAllowed: number
  interceptionsForced: number
  sacks: number
  rushingYardsAllowed: number
  avgRushYardsAllowed: number
  rushingTDsAllowed: number
  fumblesForced: number
}

export interface TeamDetailedStats {
  team: string
  conference: string
  division: string
  offense: TeamOffensiveStats
  defense: TeamDefensiveStats
}

// Helper to extract parseStats function from enhanced standings
function parseGameStats(kicking: string, passing: string, rushing: string, returns: string, calls: string) {
  const result: any = {}
  
  const fgMatch = kicking.match(/FG (\d+)\/(\d+)/)
  if (fgMatch) result.FG = `${fgMatch[1]}/${fgMatch[2]}`
  
  const epMatch = kicking.match(/EP (\d+)\/(\d+)/)
  if (epMatch) result.EP = `${epMatch[1]}/${epMatch[2]}`
  
  const puntMatch = kicking.match(/Punt (\d+)/)
  if (puntMatch) result.Punt = parseInt(puntMatch[1])
  
  const passMatch = passing.match(/Pass (\d+) for (\d+), (\d+) yds, Lg (?:t)?(\d+)(?:, (\d+) TD)?, (\d+)%, In (\d+), Hrd (\d+), Skd (\d+)/)
  if (passMatch) {
    result.Pass = {
      att: parseInt(passMatch[2]),
      comp: parseInt(passMatch[1]),
      yds: parseInt(passMatch[3]),
      TD: passMatch[5] ? parseInt(passMatch[5]) : 0,
      Int: parseInt(passMatch[7]),
      Skd: parseInt(passMatch[9])
    }
  }
  
  const rushMatch = rushing.match(/Rush (\d+) for (\d+) yds, Lg (?:t)?(\d+)(?:, (\d+) TD)?, avg ([\d.]+), Fm (\d+), QB (\d+) for (-?\d+) yds/)
  if (rushMatch) {
    result.Rush = {
      att: parseInt(rushMatch[1]),
      yds: parseInt(rushMatch[2]),
      TD: rushMatch[4] ? parseInt(rushMatch[4]) : 0,
      avg: parseFloat(rushMatch[5]),
      Fm: parseInt(rushMatch[6])
    }
  }
  
  return result
}

export async function getTeamDetailedStats(): Promise<TeamDetailedStats[]> {
  const games = await getAllGames()
  const teamStatsMap = new Map<string, {
    team: string
    conference: string
    division: string
    offense: {
      passingYards: number
      passingAttempts: number
      passingCompletions: number
      passingTDs: number
      interceptions: number
      timesSacked: number
      rushingYards: number
      rushingAttempts: number
      rushingTDs: number
      fumbles: number
    }
    defense: {
      passingYardsAllowed: number
      passingAttemptsAllowed: number
      passingCompletionsAllowed: number
      passingTDsAllowed: number
      interceptionsForced: number
      sacks: number
      rushingYardsAllowed: number
      rushingAttemptsAllowed: number
      rushingTDsAllowed: number
      fumblesForced: number
    }
  }>()

  // Process all games
  games.forEach(game => {
    const homeDivision = teamDivisions[game.homeTeam] || { conference: 'Unknown', division: 'Unknown' }
    const awayDivision = teamDivisions[game.awayTeam] || { conference: 'Unknown', division: 'Unknown' }

    // Initialize home team if needed
    if (!teamStatsMap.has(game.homeTeam)) {
      teamStatsMap.set(game.homeTeam, {
        team: game.homeTeam,
        conference: homeDivision.conference,
        division: homeDivision.division,
        offense: {
          passingYards: 0,
          passingAttempts: 0,
          passingCompletions: 0,
          passingTDs: 0,
          interceptions: 0,
          timesSacked: 0,
          rushingYards: 0,
          rushingAttempts: 0,
          rushingTDs: 0,
          fumbles: 0
        },
        defense: {
          passingYardsAllowed: 0,
          passingAttemptsAllowed: 0,
          passingCompletionsAllowed: 0,
          passingTDsAllowed: 0,
          interceptionsForced: 0,
          sacks: 0,
          rushingYardsAllowed: 0,
          rushingAttemptsAllowed: 0,
          rushingTDsAllowed: 0,
          fumblesForced: 0
        }
      })
    }

    // Initialize away team if needed
    if (!teamStatsMap.has(game.awayTeam)) {
      teamStatsMap.set(game.awayTeam, {
        team: game.awayTeam,
        conference: awayDivision.conference,
        division: awayDivision.division,
        offense: {
          passingYards: 0,
          passingAttempts: 0,
          passingCompletions: 0,
          passingTDs: 0,
          interceptions: 0,
          timesSacked: 0,
          rushingYards: 0,
          rushingAttempts: 0,
          rushingTDs: 0,
          fumbles: 0
        },
        defense: {
          passingYardsAllowed: 0,
          passingAttemptsAllowed: 0,
          passingCompletionsAllowed: 0,
          passingTDsAllowed: 0,
          interceptionsForced: 0,
          sacks: 0,
          rushingYardsAllowed: 0,
          rushingAttemptsAllowed: 0,
          rushingTDsAllowed: 0,
          fumblesForced: 0
        }
      })
    }

    const homeTeam = teamStatsMap.get(game.homeTeam)!
    const awayTeam = teamStatsMap.get(game.awayTeam)!

    // Parse stats
    const homeStats = parseGameStats(
      game.homeStats.kicking,
      game.homeStats.passing,
      game.homeStats.rushing,
      game.homeStats.returns,
      game.homeStats.calls
    )

    const awayStats = parseGameStats(
      game.awayStats.kicking,
      game.awayStats.passing,
      game.awayStats.rushing,
      game.awayStats.returns,
      game.awayStats.calls
    )

    // Home team offense (their own stats)
    if (homeStats.Pass) {
      homeTeam.offense.passingYards += homeStats.Pass.yds
      homeTeam.offense.passingAttempts += homeStats.Pass.att
      homeTeam.offense.passingCompletions += homeStats.Pass.comp
      homeTeam.offense.passingTDs += homeStats.Pass.TD
      homeTeam.offense.interceptions += homeStats.Pass.Int
      homeTeam.offense.timesSacked += homeStats.Pass.Skd
    }

    if (homeStats.Rush) {
      homeTeam.offense.rushingYards += homeStats.Rush.yds
      homeTeam.offense.rushingAttempts += homeStats.Rush.att
      homeTeam.offense.rushingTDs += homeStats.Rush.TD
      homeTeam.offense.fumbles += homeStats.Rush.Fm
    }

    // Home team defense (opponent's stats - what they allowed)
    if (awayStats.Pass) {
      homeTeam.defense.passingYardsAllowed += awayStats.Pass.yds
      homeTeam.defense.passingAttemptsAllowed += awayStats.Pass.att
      homeTeam.defense.passingCompletionsAllowed += awayStats.Pass.comp
      homeTeam.defense.passingTDsAllowed += awayStats.Pass.TD
      homeTeam.defense.interceptionsForced += awayStats.Pass.Int
      homeTeam.defense.sacks += awayStats.Pass.Skd
    }

    if (awayStats.Rush) {
      homeTeam.defense.rushingYardsAllowed += awayStats.Rush.yds
      homeTeam.defense.rushingAttemptsAllowed += awayStats.Rush.att
      homeTeam.defense.rushingTDsAllowed += awayStats.Rush.TD
      homeTeam.defense.fumblesForced += awayStats.Rush.Fm
    }

    // Away team offense (their own stats)
    if (awayStats.Pass) {
      awayTeam.offense.passingYards += awayStats.Pass.yds
      awayTeam.offense.passingAttempts += awayStats.Pass.att
      awayTeam.offense.passingCompletions += awayStats.Pass.comp
      awayTeam.offense.passingTDs += awayStats.Pass.TD
      awayTeam.offense.interceptions += awayStats.Pass.Int
      awayTeam.offense.timesSacked += awayStats.Pass.Skd
    }

    if (awayStats.Rush) {
      awayTeam.offense.rushingYards += awayStats.Rush.yds
      awayTeam.offense.rushingAttempts += awayStats.Rush.att
      awayTeam.offense.rushingTDs += awayStats.Rush.TD
      awayTeam.offense.fumbles += awayStats.Rush.Fm
    }

    // Away team defense (opponent's stats - what they allowed)
    if (homeStats.Pass) {
      awayTeam.defense.passingYardsAllowed += homeStats.Pass.yds
      awayTeam.defense.passingAttemptsAllowed += homeStats.Pass.att
      awayTeam.defense.passingCompletionsAllowed += homeStats.Pass.comp
      awayTeam.defense.passingTDsAllowed += homeStats.Pass.TD
      awayTeam.defense.interceptionsForced += homeStats.Pass.Int
      awayTeam.defense.sacks += homeStats.Pass.Skd
    }

    if (homeStats.Rush) {
      awayTeam.defense.rushingYardsAllowed += homeStats.Rush.yds
      awayTeam.defense.rushingAttemptsAllowed += homeStats.Rush.att
      awayTeam.defense.rushingTDsAllowed += homeStats.Rush.TD
      awayTeam.defense.fumblesForced += homeStats.Rush.Fm
    }
  })

  // Convert to final format
  return Array.from(teamStatsMap.values()).map(team => ({
    team: team.team,
    conference: team.conference,
    division: team.division,
    offense: {
      totalOffenseYards: team.offense.passingYards + team.offense.rushingYards,
      passingYards: team.offense.passingYards,
      yardsPerPassAttempt: team.offense.passingAttempts > 0 
        ? team.offense.passingYards / team.offense.passingAttempts 
        : 0,
      yardsPerPassCompletion: team.offense.passingCompletions > 0 
        ? team.offense.passingYards / team.offense.passingCompletions 
        : 0,
      passingTDs: team.offense.passingTDs,
      interceptions: team.offense.interceptions,
      timesSacked: team.offense.timesSacked,
      rushingYards: team.offense.rushingYards,
      avgRushYards: team.offense.rushingAttempts > 0 
        ? team.offense.rushingYards / team.offense.rushingAttempts 
        : 0,
      rushingTDs: team.offense.rushingTDs,
      fumbles: team.offense.fumbles
    },
    defense: {
      totalOffenseYardsAllowed: team.defense.passingYardsAllowed + team.defense.rushingYardsAllowed,
      passingYardsAllowed: team.defense.passingYardsAllowed,
      yardsPerPassAttemptAllowed: team.defense.passingAttemptsAllowed > 0 
        ? team.defense.passingYardsAllowed / team.defense.passingAttemptsAllowed 
        : 0,
      yardsPerPassCompletionAllowed: team.defense.passingCompletionsAllowed > 0 
        ? team.defense.passingYardsAllowed / team.defense.passingCompletionsAllowed 
        : 0,
      passingTDsAllowed: team.defense.passingTDsAllowed,
      interceptionsForced: team.defense.interceptionsForced,
      sacks: team.defense.sacks,
      rushingYardsAllowed: team.defense.rushingYardsAllowed,
      avgRushYardsAllowed: team.defense.rushingAttemptsAllowed > 0 
        ? team.defense.rushingYardsAllowed / team.defense.rushingAttemptsAllowed 
        : 0,
      rushingTDsAllowed: team.defense.rushingTDsAllowed,
      fumblesForced: team.defense.fumblesForced
    }
  }))
}

