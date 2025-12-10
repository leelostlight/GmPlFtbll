export interface GameStats {
  kicking: string
  passing: string
  rushing: string
  returns: string
  calls: string
}

export interface GameScore {
  home: number[]
  away: number[]
  totalHome: number
  totalAway: number
}

export interface Game {
  id: string
  week: number
  homeTeam: string
  awayTeam: string
  homeCoach: string
  awayCoach: string
  score: GameScore
  homeStats: GameStats
  awayStats: GameStats
}

export const week1Games: Game[] = [
  {
    id: "jets-titans-w1",
    week: 1,
    homeTeam: "New York Jets",
    awayTeam: "Tennessee Titans",
    homeCoach: "Steve Allan",
    awayCoach: "Arno Baratte",
    score: { home: [14, 0, 10, 17], away: [14, 7, 0, 0], totalHome: 41, totalAway: 21 },
    homeStats: {
      kicking: "FG 2/2, EP 5/5, CP 0/0, Punt 5, 3rd 6/15, 4th 0/0, 1st 18",
      passing: "Pass 15 for 23, 272 yds, Lg t38, 5 TD, 65%, In 0, Hrd 3, Skd 3",
      rushing: "Rush 28 for 104 yds, Lg 10, avg 3.7, Fm 1, QB 1 for 4 yds",
      returns: "KR 4 for 98 yds, PR 4 for 44 yds, IntR 3 for 28 yds",
      calls: "Fm J L, Run PW RO, Pass DL DP, Def GL DD",
    },
    awayStats: {
      kicking: "FG 0/0, EP 3/3, CP 0/0, Punt 6, 3rd 9/17, 4th 0/0, 1st 19",
      passing: "Pass 22 for 40, 250 yds, Lg 29, 1 TD, 55%, In 3, Hrd 4, Skd 6",
      rushing: "Rush 27 for 70 yds, Lg 12, 1 TD, avg 2.6, Fm 1, QB 1 for 6 yds",
      returns: "KR 1 for 89 yds, 1 TD, PR 3 for 33 yds, FumR 1 for 18 yds",
      calls: "Fm J A, Run SW RC, Pass DL DO, Def RD SS",
    },
  },
  {
    id: "bills-ravens-w1",
    week: 1,
    homeTeam: "Buffalo Bills",
    awayTeam: "Baltimore Ravens",
    homeCoach: "Simon Kitchen",
    awayCoach: "Lee Elkins",
    score: { home: [0, 3, 0, 0], away: [17, 6, 0, 7], totalHome: 3, totalAway: 30 },
    homeStats: {
      kicking: "FG 1/1, EP 0/0, CP 0/0, Punt 8, 3rd 3/13, 4th 0/1, 1st 12",
      passing: "Pass 18 for 36, 170 yds, Lg 42, 50%, In 0, Hrd 10, Skd 2",
      rushing: "Rush 17 for 43 yds, Lg 7, avg 2.5, Fm 2, QB 1 for 0 yds",
      returns: "KR 6 for 105 yds, PR 1 for 6 yds, IntR 1 for 18 yds",
      calls: "Fm B C, Run SW DR, Pass SI DL, Def RD BZ",
    },
    awayStats: {
      kicking: "FG 3/3, EP 3/3, CP 0/0, Punt 4, 3rd 7/16, 4th 0/0, 1st 14",
      passing: "Pass 19 for 37, 247 yds, Lg t69, 2 TD, 51%, In 1, Hrd 9, Skd 2",
      rushing: "Rush 16 for 40 yds, Lg 9, 1 TD, avg 2.5, Fm 1, QB 0 for 0 yds",
      returns: "KR 2 for 58 yds, PR 8 for 93 yds, FumR 1 for 16 yds",
      calls: "Fm T D, Run OR TW, Pass LL DP, Def KB ZD",
    },
  },
  {
    id: "dolphins-seahawks-w1",
    week: 1,
    homeTeam: "Miami Dolphins",
    awayTeam: "Seattle Seahawks",
    homeCoach: "Mike Knight",
    awayCoach: "Alan Seward",
    score: { home: [7, 10, 7, 0], away: [0, 10, 14, 6], totalHome: 24, totalAway: 30 },
    homeStats: {
      kicking: "FG 1/1, EP 3/3, CP 0/0, Punt 4, 3rd 5/17, 4th 0/1, 1st 16",
      passing: "Pass 23 for 47, 159 yds, Lg 14, 49%, In 2, Hrd 8, Skd 2",
      rushing: "Rush 15 for 45 yds, Lg 8, 2 TD, avg 3.0, Fm 4, QB 1 for 5 yds",
      returns: "KR 3 for 49 yds, PR 6 for 56 yds, IntR 1 for 71 yds, 1 TD",
      calls: "Fm K L, Run RW QR, Pass SI SL, Def RD ZS",
    },
    awayStats: {
      kicking: "FG 3/3, EP 3/3, CP 0/0, Punt 7, 3rd 1/12, 4th 0/0, 1st 16",
      passing: "Pass 18 for 35, 302 yds, Lg 58, 3 TD, 51%, In 1, Hrd 4, Skd 3",
      rushing: "Rush 21 for 53 yds, Lg 10, avg 2.5, Fm 1, QB 0 for 0 yds",
      returns: "KR 2 for 58 yds, PR 1 for 7 yds, DefR 2 for 50 yds",
      calls: "Fm I C, Run SW DT, Pass DP FP, Def MD ZD",
    },
  },
  {
    id: "patriots-chargers-w1",
    week: 1,
    homeTeam: "New England Patriots",
    awayTeam: "Los Angeles Chargers",
    homeCoach: "Gary Wallis",
    awayCoach: "Matt White",
    score: { home: [14, 0, 3, 0], away: [14, 10, 7, 3], totalHome: 17, totalAway: 34 },
    homeStats: {
      kicking: "FG 1/1, EP 2/2, CP 0/0, Punt 7, 3rd 6/14, 4th 0/0, 1st 16",
      passing: "Pass 18 for 35, 255 yds, Lg t79, 1 TD, 51%, In 1, Hrd 4, Skd 3",
      rushing: "Rush 25 for 73 yds, Lg 12, avg 2.9, Fm 1, QB 0 for 0 yds",
      returns: "KR 4 for 63 yds, PR 1 for 1 yds, FumR 1 for 38 yds, 1 TD",
      calls: "Fm B K, Run CW RT, Pass SL SC, Def RD BZ",
    },
    awayStats: {
      kicking: "FG 2/2, EP 4/4, CP 0/0, Punt 4, 3rd 5/14, 4th 1/1, 1st 16",
      passing: "Pass 14 for 20, 200 yds, Lg 43, 1 TD, 70%, In 0, Hrd 0, Skd 2",
      rushing: "Rush 35 for 116 yds, Lg 12, 2 TD, avg 3.3, Fm 2, QB 1 for -3 yds",
      returns: "KR 4 for 120 yds, PR 7 for 82 yds, IntR 1 for 28 yds, 1 TD",
      calls: "Fm A Z, Run RT DW, Pass SI FO, Def RD BZ",
    },
  },
  {
    id: "bengals-chiefs-w1",
    week: 1,
    homeTeam: "Cincinnati Bengals",
    awayTeam: "Kansas City Chiefs",
    homeCoach: "Matthieu Rialland",
    awayCoach: "Diane Findlay",
    score: { home: [3, 5, 7, 0], away: [0, 0, 0, 7], totalHome: 15, totalAway: 7 },
    homeStats: {
      kicking: "FG 2/2, EP 1/1, CP 0/0, Punt 6, 3rd 8/17, 4th 0/0, 1st 24",
      passing: "Pass 18 for 42, 263 yds, Lg 31, 43%, In 1, Hrd 22, Skd 2",
      rushing: "Rush 31 for 89 yds, Lg 13, 1 TD, avg 2.9, Fm 1, QB 1 for 0 yds",
      returns: "KR 2 for 44 yds, PR 2 for 11 yds, IntR 1 for 41 yds",
      calls: "Fm Z I, Run SW RC, Pass DP SL, Def BZ FD",
    },
    awayStats: {
      kicking: "FG 0/0, EP 1/1, CP 0/0, Punt 6, 3rd 4/10, 4th 0/0, 1st 8",
      passing: "Pass 8 for 21, 75 yds, Lg 17, 38%, In 2, Hrd 3, Skd 4",
      rushing: "Rush 18 for 113 yds, Lg 14, 1 TD, avg 6.3, Fm 1, QB 0 for 0 yds",
      returns: "KR 2 for 38 yds, PR 2 for 2 yds, DefR 2 for 31 yds",
      calls: "Fm I U, Run DW DR, Pass QO DO, Def BZ KB",
    },
  },
  {
    id: "texans-raiders-w1",
    week: 1,
    homeTeam: "Houston Texans",
    awayTeam: "Las Vegas Raiders",
    homeCoach: "Don Cane",
    awayCoach: "Paul Nevett",
    score: { home: [7, 0, 0, 0], away: [7, 6, 0, 9], totalHome: 7, totalAway: 22 },
    homeStats: {
      kicking: "FG 0/0, EP 1/1, CP 0/0, Punt 8, 3rd 3/13, 4th 0/1, 1st 9",
      passing: "Pass 15 for 34, 171 yds, Lg 26, 44%, In 2, Hrd 7, Skd 2",
      rushing: "Rush 15 for 21 yds, Lg 7, avg 1.4, Fm 1, QB 1 for -4 yds",
      returns: "KR 5 for 84 yds, PR 2 for 3 yds, DefR 2 for 11 yds, 1 TD",
      calls: "Fm I A, Run TR RC, Pass SL DI, Def OV RD",
    },
    awayStats: {
      kicking: "FG 6/5, EP 1/1, CP 0/0, Punt 3, 3rd 7/17, 4th 0/0, 1st 18",
      passing: "Pass 20 for 38, 243 yds, Lg 31, 53%, In 2, Hrd 7, Skd 4",
      rushing: "Rush 28 for 70 yds, Lg 6, 1 TD, avg 2.5, Fm 1, QB 1 for 0 yds",
      returns: "KR 2 for 48 yds, PR 8 for 58 yds, IntR 1 for 9 yds",
      calls: "Fm T A, Run SW RC, Pass DL FP, Def RD FS",
    },
  },
  {
    id: "giants-packers-w1",
    week: 1,
    homeTeam: "New York Giants",
    awayTeam: "Green Bay Packers",
    homeCoach: "Kevin Wallis",
    awayCoach: "Bernard Brady",
    score: { home: [7, 10, 0, 14], away: [0, 0, 7, 6], totalHome: 31, totalAway: 13 },
    homeStats: {
      kicking: "FG 1/1, EP 4/4, CP 0/0, Punt 2, 3rd 11/15, 4th 0/0, 1st 25",
      passing: "Pass 19 for 35, 206 yds, Lg 35, 1 TD, 54%, In 0, Hrd 7, Skd 2",
      rushing: "Rush 27 for 147 yds, Lg t31, 2 TD, avg 5.4, Fm 1, QB 0 for 0 yds",
      returns: "KR 0 for 0 yds, PR 1 for 0 yds, FumR 1 for 33 yds, 1 TD",
      calls: "Fm T I, Run RN LT, Pass LO SI, Def RD MD",
    },
    awayStats: {
      kicking: "FG 0/0, EP 1/1, CP 1/0, Punt 6, 3rd 5/13, 4th 0/0, 1st 20",
      passing: "Pass 8 for 16, 98 yds, Lg 29, 50%, In 0, Hrd 2, Skd 2",
      rushing: "Rush 38 for 186 yds, Lg 25, 2 TD, avg 4.9, Fm 1, QB 2 for 10 yds",
      returns: "KR 6 for 101 yds, PR 2 for 13 yds, FumR 0 for 0 yds",
      calls: "Fm J I, Run RT CW, Pass OP LO, Def LB RD",
    },
  },
  {
    id: "eagles-bears-w1",
    week: 1,
    homeTeam: "Philadelphia Eagles",
    awayTeam: "Chicago Bears",
    homeCoach: "Chris Weeks",
    awayCoach: "Jonathan Miles",
    score: { home: [0, 3, 7, 0], away: [6, 3, 17, 0], totalHome: 10, totalAway: 26 },
    homeStats: {
      kicking: "FG 1/1, EP 1/1, CP 0/0, Punt 7, 3rd 2/13, 4th 0/1, 1st 12",
      passing: "Pass 12 for 31, 124 yds, Lg 27, 39%, In 2, Hrd 6, Skd 3",
      rushing: "Rush 26 for 78 yds, Lg 9, 1 TD, avg 3.0, Fm 3, QB 1 for 2 yds",
      returns: "KR 5 for 67 yds, PR 2 for 5 yds, IntR 1 for 35 yds",
      calls: "Fm A E, Run DR SW, Pass OS PI, Def OX SS",
    },
    awayStats: {
      kicking: "FG 4/4, EP 2/2, CP 0/0, Punt 6, 3rd 5/18, 4th 0/2, 1st 15",
      passing: "Pass 24 for 44, 178 yds, Lg 18, 55%, In 1, Hrd 3, Skd 5",
      rushing: "Rush 20 for 47 yds, Lg 7, 1 TD, avg 2.3, Fm 0, QB 0 for 0 yds",
      returns: "KR 0 for 0 yds, PR 6 for 54 yds, DefR 2 for 32 yds, 1 TD",
      calls: "Fm I C, Run RL RT, Pass QL FP, Def RD PD",
    },
  },
  {
    id: "cowboys-falcons-w1",
    week: 1,
    homeTeam: "Dallas Cowboys",
    awayTeam: "Atlanta Falcons",
    homeCoach: "Eric Hoffman",
    awayCoach: "Lee Dunstan",
    score: { home: [0, 0, 7, 0], away: [14, 7, 7, 10], totalHome: 7, totalAway: 38 },
    homeStats: {
      kicking: "FG 0/0, EP 1/1, CP 0/0, Punt 3, 3rd 7/11, 4th 0/0, 1st 16",
      passing: "Pass 16 for 33, 187 yds, Lg 34, 1 TD, 48%, In 3, Hrd 5, Skd 3",
      rushing: "Rush 10 for 30 yds, Lg 13, avg 3.0, Fm 0, QB 1 for 13 yds",
      returns: "KR 3 for 64 yds, PR 0 for 0 yds, FumR 0 for 0 yds",
      calls: "Fm C A, Run QR CW, Pass DP DL, Def RD FD",
    },
    awayStats: {
      kicking: "FG 1/1, EP 5/5, CP 0/0, Punt 1, 3rd 14/19, 4th 1/1, 1st 30",
      passing: "Pass 13 for 23, 170 yds, Lg 23, 4 TD, 57%, In 0, Hrd 3, Skd 1",
      rushing: "Rush 54 for 233 yds, Lg 16, 1 TD, avg 4.3, Fm 0, QB 0 for 0 yds",
      returns: "KR 1 for 28 yds, PR 1 for 3 yds, IntR 1 for 34 yds",
      calls: "Fm I T, Run PW SW, Pass LL SM, Def ZS ZD",
    },
  },
  {
    id: "commands-49ers-w1",
    week: 1,
    homeTeam: "Washington Commands",
    awayTeam: "San Francisco 49ers",
    homeCoach: "Phillip Haggis",
    awayCoach: "Dave Smart",
    score: { home: [14, 3, 0, 3], away: [13, 6, 7, 0], totalHome: 20, totalAway: 26 },
    homeStats: {
      kicking: "FG 2/2, EP 2/2, CP 0/0, Punt 6, 3rd 3/14, 4th 1/1, 1st 14",
      passing: "Pass 18 for 38, 163 yds, Lg 25, 47%, In 3, Hrd 8, Skd 2",
      rushing: "Rush 20 for 43 yds, Lg 9, 2 TD, avg 2.1, Fm 1, QB 2 for 12 yds",
      returns: "KR 4 for 111 yds, PR 3 for 17 yds, FumR 1 for 8 yds",
      calls: "Fm A B, Run QR RW, Pass SL SI, Def RD MD",
    },
    awayStats: {
      kicking: "FG 4/4, EP 2/2, CP 0/0, Punt 5, 3rd 4/13, 4th 0/0, 1st 19",
      passing: "Pass 15 for 28, 254 yds, Lg 31, 54%, In 0, Hrd 2, Skd 1",
      rushing: "Rush 36 for 105 yds, Lg 10, 2 TD, avg 2.9, Fm 2, QB 0 for 0 yds",
      returns: "KR 4 for 116 yds, PR 4 for 13 yds, IntR 2 for 16 yds",
      calls: "Fm O B, Run SW RC, Pass DP DL, Def RD WC",
    },
  },
  {
    id: "vikings-rams-w1",
    week: 1,
    homeTeam: "Minnesota Vikings",
    awayTeam: "Los Angeles Rams",
    homeCoach: "Mike Smith",
    awayCoach: "Todd Hastings",
    score: { home: [0, 0, 8, 8, 3], away: [0, 9, 7, 0, 0], totalHome: 19, totalAway: 16 },
    homeStats: {
      kicking: "FG 1/1, EP 0/0, CP 2/2, Punt 8, 3rd 2/14, 4th 0/0, 1st 17",
      passing: "Pass 19 for 39, 277 yds, Lg 49, 1 TD, 49%, In 2, Hrd 7, Skd 2",
      rushing: "Rush 19 for 73 yds, Lg 13, 1 TD, avg 3.8, Fm 1, QB 1 for 0 yds",
      returns: "KR 3 for 30 yds, PR 1 for 5 yds, FumR 0 for 0 yds",
      calls: "Fm K C, Run RT SW, Pass SI DP, Def RD GL",
    },
    awayStats: {
      kicking: "FG 4/3, EP 1/1, CP 0/0, Punt 7, 3rd 8/22, 4th 0/0, 1st 20",
      passing: "Pass 16 for 25, 129 yds, Lg 18, 64%, In 0, Hrd 5, Skd 1",
      rushing: "Rush 54 for 206 yds, Lg 17, 1 TD, avg 3.8, Fm 2, QB 0 for 0 yds",
      returns: "KR 0 for 0 yds, PR 4 for 20 yds, FumR 0 for 0 yds",
      calls: "Fm I G, Run SW RT, Pass SO SP, Def RD MD",
    },
  },
  {
    id: "lions-panthers-w1",
    week: 1,
    homeTeam: "Detroit Lions",
    awayTeam: "Carolina Panthers",
    homeCoach: "Scott Kramer",
    awayCoach: "Graham Bates",
    score: { home: [0, 3, 14, 3], away: [0, 3, 7, 0], totalHome: 20, totalAway: 10 },
    homeStats: {
      kicking: "FG 4/2, EP 2/2, CP 0/0, Punt 5, 3rd 12/22, 4th 0/0, 1st 19",
      passing: "Pass 12 for 23, 162 yds, Lg 32, 52%, In 0, Hrd 6, Skd 2",
      rushing: "Rush 50 for 183 yds, Lg 11, 2 TD, avg 3.7, Fm 1, QB 1 for 10 yds",
      returns: "KR 2 for 32 yds, PR 4 for 44 yds, IntR 1 for 15 yds",
      calls: "Fm I T, Run SW RT, Pass DL SI, Def WC RD",
    },
    awayStats: {
      kicking: "FG 1/1, EP 1/1, CP 0/0, Punt 6, 3rd 1/12, 4th 0/4, 1st 12",
      passing: "Pass 19 for 39, 215 yds, Lg 32, 1 TD, 49%, In 1, Hrd 1, Skd 3",
      rushing: "Rush 14 for 37 yds, Lg 8, avg 2.6, Fm 0, QB 0 for 0 yds",
      returns: "KR 4 for 136 yds, PR 2 for 21 yds, FumR 0 for 0 yds",
      calls: "Fm D A, Run RT DR, Pass DL SI, Def BZ FD",
    },
  },
];

export async function getGameById(gameId: string): Promise<Game | null> {
  // In a real app, this would fetch from a database or API
  return week1Games.find(game => game.id === gameId) || null
}

export async function getAllGames(): Promise<Game[]> {
  return week1Games
}
      