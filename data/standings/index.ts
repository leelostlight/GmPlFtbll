import { Team } from '../teams'
import { getAllTeams } from '../teams'
import { getEnhancedStandings, EnhancedStandings } from './enhanced'

export interface StandingsEntry extends Team {
  winPercentage: number
  gamesBack?: number
}

export interface DivisionStandings {
  conference: string
  division: string
  teams: StandingsEntry[]
}

export interface ConferenceStandings {
  conference: string
  divisions: DivisionStandings[]
}

export interface StandingsData {
  conferences: ConferenceStandings[]
}

// Export the enhanced standings format
export type { EnhancedStandings }
export { getEnhancedStandings }

// Conference-wide standings format for table display
export interface ConferenceStandingRow {
  Rank: number
  Team: string
  Coach: string
  W: number
  L: number
  T: number
  PF: number
  PA: number
  Net: number
}

export interface ConferenceStandingsTable {
  AFC: ConferenceStandingRow[]
  NFC: ConferenceStandingRow[]
}

export async function getConferenceStandings(): Promise<ConferenceStandingsTable> {
  const enhanced = await getEnhancedStandings()
  
  const result: ConferenceStandingsTable = {
    AFC: [],
    NFC: []
  }
  
  // Process each conference
  Object.keys(enhanced).forEach(conference => {
    const teams: ConferenceStandingRow[] = []
    
    // Collect all teams from all divisions in this conference
    Object.keys(enhanced[conference]).forEach(division => {
      enhanced[conference][division].forEach(team => {
        teams.push({
          Rank: 0, // Will be set after sorting
          Team: team.team,
          Coach: team.coach,
          W: team.W,
          L: team.L,
          T: team.T,
          PF: team.FOR,
          PA: team.AGN,
          Net: team.FOR - team.AGN
        })
      })
    })
    
    // Sort by win percentage, then wins, then net points
    teams.sort((a, b) => {
      const aWinPct = a.W / (a.W + a.L + a.T)
      const bWinPct = b.W / (b.W + b.L + b.T)
      
      if (bWinPct !== aWinPct) {
        return bWinPct - aWinPct
      }
      if (b.W !== a.W) {
        return b.W - a.W
      }
      return b.Net - a.Net
    })
    
    // Assign ranks
    teams.forEach((team, index) => {
      team.Rank = index + 1
    })
    
    result[conference as 'AFC' | 'NFC'] = teams
  })
  
  return result
}

function calculateGamesBack(teams: StandingsEntry[]): StandingsEntry[] {
  return teams.map((team, index) => {
    const gamesBack = index > 0 
      ? teams[0].wins - team.wins + (teams[0].losses - team.losses)
      : 0
    return {
      ...team,
      gamesBack: gamesBack > 0 ? gamesBack / 2 : 0,
    }
  })
}

export async function getStandings(): Promise<StandingsData> {
  const teams = await getAllTeams()
  
  // Calculate win percentage for all teams
  const teamsWithStats = teams.map(team => ({
    ...team,
    winPercentage: team.wins / (team.wins + team.losses + (team.ties || 0)),
  }))

  // Group by conference and division
  const conferenceMap = new Map<string, Map<string, StandingsEntry[]>>()

  teamsWithStats.forEach(team => {
    if (!conferenceMap.has(team.conference)) {
      conferenceMap.set(team.conference, new Map())
    }
    const divisionMap = conferenceMap.get(team.conference)!
    if (!divisionMap.has(team.division)) {
      divisionMap.set(team.division, [])
    }
    divisionMap.get(team.division)!.push(team)
  })

  // Sort teams within each division
  const conferences: ConferenceStandings[] = []
  
  // Process conferences in order: AFC, NFC
  const conferenceOrder = ['AFC', 'NFC']
  const divisionOrder = ['East', 'Central', 'West', 'South']

  conferenceOrder.forEach(confName => {
    const divisionMap = conferenceMap.get(confName)
    if (!divisionMap) return

    const divisions: DivisionStandings[] = []
    
    divisionOrder.forEach(divName => {
      const teams = divisionMap.get(divName)
      if (!teams || teams.length === 0) return

      // Sort by win percentage (descending), then by wins
      const sorted = teams.sort((a, b) => {
        if (b.winPercentage !== a.winPercentage) {
          return b.winPercentage - a.winPercentage
        }
        return b.wins - a.wins
      })

      // Calculate games back within division
      const withGamesBack = calculateGamesBack(sorted)

      divisions.push({
        conference: confName,
        division: divName,
        teams: withGamesBack,
      })
    })

    if (divisions.length > 0) {
      conferences.push({
        conference: confName,
        divisions,
      })
    }
  })

  return { conferences }
}

