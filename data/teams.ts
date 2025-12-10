import { getAllGames } from './games'

export interface Team {
  id: string
  name: string
  wins: number
  losses: number
  ties?: number
  pointsFor: number
  pointsAgainst: number
  conference: string
  division: string
}

function generateTeamId(teamName: string): string {
  return teamName.toLowerCase().replace(/\s+/g, '-')
}

// Division and conference assignments based on provided structure
export const teamDivisions: Record<string, { conference: string; division: string }> = {
  // AFC East
  'New York Jets': { conference: 'AFC', division: 'East' },
  'Miami Dolphins': { conference: 'AFC', division: 'East' },
  'New England Patriots': { conference: 'AFC', division: 'East' },
  'Buffalo Bills': { conference: 'AFC', division: 'East' },
  // AFC Central
  'Baltimore Ravens': { conference: 'AFC', division: 'Central' },
  'Cincinnati Bengals': { conference: 'AFC', division: 'Central' },
  'Tennessee Titans': { conference: 'AFC', division: 'Central' },
  'Houston Texans': { conference: 'AFC', division: 'Central' },
  // AFC West
  'Los Angeles Chargers': { conference: 'AFC', division: 'West' },
  'Las Vegas Raiders': { conference: 'AFC', division: 'West' },
  'Kansas City Chiefs': { conference: 'AFC', division: 'West' },
  'Seattle Seahawks': { conference: 'AFC', division: 'West' },
  // NFC East
  'New York Giants': { conference: 'NFC', division: 'East' },
  'Washington Commands': { conference: 'NFC', division: 'East' },
  'Philadelphia Eagles': { conference: 'NFC', division: 'East' },
  'Dallas Cowboys': { conference: 'NFC', division: 'East' },
  // NFC Central
  'Chicago Bears': { conference: 'NFC', division: 'Central' },
  'Detroit Lions': { conference: 'NFC', division: 'Central' },
  'Minnesota Vikings': { conference: 'NFC', division: 'Central' },
  'Green Bay Packers': { conference: 'NFC', division: 'Central' },
  // NFC South (note: Carolina Panthers and Los Angeles Rams should be here, but JSON shows them in West)
  'Atlanta Falcons': { conference: 'NFC', division: 'South' },
  'Carolina Panthers': { conference: 'NFC', division: 'South' },
  'Los Angeles Rams': { conference: 'NFC', division: 'South' },
  'San Francisco 49ers': { conference: 'NFC', division: 'South' },
}

async function calculateTeamStats(): Promise<Team[]> {
  const games = await getAllGames()
  const teamMap = new Map<string, Team>()

  games.forEach(game => {
    // Process home team
    if (!teamMap.has(game.homeTeam)) {
      const division = teamDivisions[game.homeTeam] || { conference: 'Unknown', division: 'Unknown' }
      teamMap.set(game.homeTeam, {
        id: generateTeamId(game.homeTeam),
        name: game.homeTeam,
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        conference: division.conference,
        division: division.division,
      })
    }
    const homeTeam = teamMap.get(game.homeTeam)!

    // Process away team
    if (!teamMap.has(game.awayTeam)) {
      const division = teamDivisions[game.awayTeam] || { conference: 'Unknown', division: 'Unknown' }
      teamMap.set(game.awayTeam, {
        id: generateTeamId(game.awayTeam),
        name: game.awayTeam,
        wins: 0,
        losses: 0,
        ties: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        conference: division.conference,
        division: division.division,
      })
    }
    const awayTeam = teamMap.get(game.awayTeam)!

    // Update stats
    homeTeam.pointsFor += game.score.totalHome
    homeTeam.pointsAgainst += game.score.totalAway
    awayTeam.pointsFor += game.score.totalAway
    awayTeam.pointsAgainst += game.score.totalHome

    // Determine winner
    if (game.score.totalHome > game.score.totalAway) {
      homeTeam.wins += 1
      awayTeam.losses += 1
    } else if (game.score.totalAway > game.score.totalHome) {
      awayTeam.wins += 1
      homeTeam.losses += 1
    } else {
      homeTeam.ties! += 1
      awayTeam.ties! += 1
    }
  })

  return Array.from(teamMap.values())
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  const teams = await calculateTeamStats()
  return teams.find(team => team.id === teamId) || null
}

export async function getAllTeams(): Promise<Team[]> {
  return calculateTeamStats()
}

