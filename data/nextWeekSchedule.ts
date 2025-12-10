export interface NextWeekGame {
  id: string
  week: number
  homeTeam: string
  awayTeam: string
  predictedHomeScore?: number
  predictedAwayScore?: number
}

export const nextWeekGames: NextWeekGame[] = [
  {
    id: "texans-jets-w2",
    week: 2,
    homeTeam: "New York Jets",
    awayTeam: "Houston Texans"
  },
  {
    id: "bengals-bills-w2",
    week: 2,
    homeTeam: "Buffalo Bills",
    awayTeam: "Cincinnati Bengals"
  },
  {
    id: "raiders-dolphins-w2",
    week: 2,
    homeTeam: "Miami Dolphins",
    awayTeam: "Las Vegas Raiders"
  },
  {
    id: "chiefs-patriots-w2",
    week: 2,
    homeTeam: "New England Patriots",
    awayTeam: "Kansas City Chiefs"
  },
  {
    id: "chargers-titans-w2",
    week: 2,
    homeTeam: "Tennessee Titans",
    awayTeam: "Los Angeles Chargers"
  },
  {
    id: "seahawks-ravens-w2",
    week: 2,
    homeTeam: "Baltimore Ravens",
    awayTeam: "Seattle Seahawks"
  },
  {
    id: "lions-giants-w2",
    week: 2,
    homeTeam: "New York Giants",
    awayTeam: "Detroit Lions"
  },
  {
    id: "vikings-eagles-w2",
    week: 2,
    homeTeam: "Philadelphia Eagles",
    awayTeam: "Minnesota Vikings"
  },
  {
    id: "panthers-cowboys-w2",
    week: 2,
    homeTeam: "Dallas Cowboys",
    awayTeam: "Carolina Panthers"
  },
  {
    id: "rams-commands-w2",
    week: 2,
    homeTeam: "Washington Commands",
    awayTeam: "Los Angeles Rams"
  },
  {
    id: "49ers-packers-w2",
    week: 2,
    homeTeam: "Green Bay Packers",
    awayTeam: "San Francisco 49ers"
  },
  {
    id: "falcons-bears-w2",
    week: 2,
    homeTeam: "Chicago Bears",
    awayTeam: "Atlanta Falcons"
  }
]

export async function getNextWeekSchedule(): Promise<NextWeekGame[]> {
  return nextWeekGames
}

