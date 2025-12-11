import { Game } from './index'

// Helper function to convert Week 2 format to Week 1 format
function convertWeek2Game(game2: any): Game {
  const formatKicking = (k: any, d: any) => {
    // Handle cases where fg might be "2/1" (should be "1/2")
    let fg = k.fg || "0/0"
    if (fg.includes('/')) {
      const [made, attempted] = fg.split('/')
      if (parseInt(made) > parseInt(attempted)) {
        fg = `${attempted}/${made}` // Swap if reversed
      }
    }
    const ep = k.ep || "0/0"
    const cp = k.cp || "0/0"
    const punt = k.punt || 0
    const third = d.third || "0/0"
    const fourth = d.fourth || "0/0"
    const first = d.first || 0
    return `FG ${fg}, EP ${ep}, CP ${cp}, Punt ${punt}, 3rd ${third}, 4th ${fourth}, 1st ${first}`
  }

  const formatPassing = (p: any) => {
    const [comp, att] = p.cmpAtt.split('/')
    const long = p.long || 0
    const td = p.td || 0
    const tdStr = td > 0 ? `, ${td} TD` : ""
    const longStr = td > 0 && long > 0 ? `t${long}` : long.toString()
    return `Pass ${comp} for ${att}, ${p.yards} yds, Lg ${longStr}${tdStr}, ${p.pct}%, In ${p.int}, Hrd ${p.hurries}, Skd ${p.sacks}`
  }

  const formatRushing = (r: any) => {
    const td = r.td || 0
    const tdStr = td > 0 ? `, ${td} TD` : ""
    const long = r.long || 0
    const longStr = td > 0 && long > 0 ? `t${long}` : long.toString()
    return `Rush ${r.att} for ${r.yards} yds, Lg ${longStr}${tdStr}, avg ${r.avg}, Fm ${r.fum}, QB ${r.qb}`
  }

  const formatReturns = (ret: any) => {
    const parts: string[] = []
    if (ret.kr) parts.push(`KR ${ret.kr}`)
    if (ret.pr) parts.push(`PR ${ret.pr}`)
    if (ret.fumR) parts.push(`FumR ${ret.fumR}`)
    if (ret.intR) parts.push(`IntR ${ret.intR}`)
    return parts.join(", ")
  }

  const formatCalls = (c: any) => {
    return `Fm ${c.fm}, Run ${c.run}, Pass ${c.pass}, Def ${c.def}`
  }

  const id = `${game2.homeTeam.name.toLowerCase().replace(/\s+/g, '-')}-${game2.awayTeam.name.toLowerCase().replace(/\s+/g, '-')}-w${game2.week}`

  return {
    id,
    week: game2.week,
    homeTeam: game2.homeTeam.name,
    awayTeam: game2.awayTeam.name,
    homeCoach: game2.homeTeam.coach,
    awayCoach: game2.awayTeam.coach,
    score: {
      home: game2.score.quarters.home,
      away: game2.score.quarters.away,
      totalHome: game2.score.home,
      totalAway: game2.score.away,
    },
    homeStats: {
      kicking: formatKicking(game2.kicking.home, game2.downs.home),
      passing: formatPassing(game2.passing.home),
      rushing: formatRushing(game2.rushing.home),
      returns: formatReturns(game2.returns.home),
      calls: formatCalls(game2.playCalls.home),
    },
    awayStats: {
      kicking: formatKicking(game2.kicking.away, game2.downs.away),
      passing: formatPassing(game2.passing.away),
      rushing: formatRushing(game2.rushing.away),
      returns: formatReturns(game2.returns.away),
      calls: formatCalls(game2.playCalls.away),
    },
  }
}

// Week 2 games data (partial - you'll need to add the remaining games)
const week2GamesData = [
  {
    "week": 2,
    "gameNumber": 1,
    "awayTeam": { "name": "Miami Dolphins", "coach": "Mike Knight" },
    "homeTeam": { "name": "New York Jets", "coach": "Steve Allan" },
    "score": { "away": 11, "home": 47, "quarters": { "away": [0,8,3,0], "home": [21,5,7,14] } },
    "kicking": { "away": { "fg":"1/1","ep":"0/0","cp":"1/1","punt":5 }, "home": { "fg":"1/1","ep":"6/6","cp":"0/0","punt":5 } },
    "downs": { "away": { "third":"3/13","fourth":"0/2","first":10 }, "home": { "third":"10/17","fourth":"0/0","first":20 } },
    "passing": { "away": {"cmpAtt":"15/36","yards":97,"long":24,"pct":42,"td":0,"int":3,"hurries":0,"sacks":5}, "home": {"cmpAtt":"20/33","yards":281,"long":41,"pct":61,"td":6,"int":1,"hurries":1,"sacks":2 } },
    "rushing": { "away": {"att":11,"yards":41,"long":11,"avg":3.7,"td":0,"fum":1,"qb":"0 for 0"}, "home": {"att":30,"yards":167,"long":17,"avg":5.6,"td":0,"fum":0,"qb":"0 for 0"} },
    "returns": { "away": {"kr":"4 for 71","pr":"2 for 13","fumR":"1 for 49"}, "home": {"kr":"2 for 97","pr":"3 for 10","fumR":"3 for 30"} },
    "playCalls": { "away":{"fm":"L K","run":"RW","pass":"LO DL","def":"ZD ZS"}, "home":{"fm":"J S","run":"PW RW","pass":"DP DL","def":"WC RD"} }
  },
  {
    "week": 2,
    "gameNumber": 2,
    "awayTeam": { "name": "New England Patriots", "coach": "Gary Wallis" },
    "homeTeam": { "name": "Buffalo Bills", "coach": "Simon Kitchen" },
    "score": { "away": 10, "home": 20, "quarters": { "away":[0,3,0,7],"home":[3,10,7,0]} },
    "kicking": { "away": {"fg":"1/1","ep":"1/1","cp":"0/0","punt":5}, "home": {"fg":"2/2","ep":"2/2","cp":"0/0","punt":3} },
    "downs": { "away":{"third":"6/12","fourth":"0/0","first":13}, "home":{"third":"9/14","fourth":"0/0","first":22} },
    "passing": { "away":{"cmpAtt":"10/17","yards":100,"long":28,"pct":59,"td":1,"int":1,"hurries":3,"sacks":3}, "home":{"cmpAtt":"14/26","yards":203,"long":30,"pct":54,"td":0,"int":2,"hurries":2,"sacks":1} },
    "rushing": { "away":{"att":30,"yards":118,"long":14,"avg":3.9,"td":0,"fum":1,"qb":"1 for 14"}, "home":{"att":43,"yards":140,"long":12,"avg":3.3,"td":2,"fum":0,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"3 for 71","pr":"3 for 11","fumR":"2 for 44"}, "home":{"kr":"2 for 12","pr":"3 for 23","fumR":"2 for 17"} },
    "playCalls": { "away":{"fm":"A B","run":"DR RC","pass":"SL SC","def":"RD ZS"}, "home":{"fm":"W T","run":"SW RC","pass":"DL SL","def":"BZ KB"} }
  },
  {
    "week": 2,
    "gameNumber": 3,
    "awayTeam": { "name": "Tennessee Titans", "coach": "Arno Baratte" },
    "homeTeam": { "name": "Cincinnati Bengals", "coach": "Matthieu Rialland" },
    "score": { "away": 11, "home": 31, "quarters": { "away":[3,0,0,8],"home":[7,7,7,10]} },
    "kicking": { "away": {"fg":"1/1","ep":"0/0","cp":"1/1","punt":4}, "home":{"fg":"2/1","ep":"4/4","cp":"0/0","punt":4} },
    "downs": { "away":{"third":"6/15","fourth":"0/1","first":16}, "home":{"third":"8/14","fourth":"0/0","first":22} },
    "passing": { "away":{"cmpAtt":"16/30","yards":149,"long":25,"pct":53,"td":1,"int":3,"hurries":3,"sacks":2}, "home":{"cmpAtt":"14/33","yards":186,"long":35,"pct":42,"td":1,"int":2,"hurries":2,"sacks":1} },
    "rushing": { "away":{"att":32,"yards":127,"long":10,"avg":4.0,"td":0,"fum":1,"qb":"0 for 0"}, "home":{"att":29,"yards":91,"long":13,"avg":3.1,"td":2,"fum":0,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"5 for 68","pr":"0 for 0","fumR":"1 for 7"}, "home":{"kr":"3 for 100","pr":"3 for 24","fumR":"1 for 8"} },
    "playCalls": { "away":{"fm":"A J","run":"SW RT","pass":"DL FP","def":"OV WC"}, "home":{"fm":"Z I","run":"RC RT","pass":"SI DI","def":"ZD BZ"} }
  },
  {
    "week": 2,
    "gameNumber": 4,
    "awayTeam": { "name": "Baltimore Ravens", "coach": "Lee Elkins" },
    "homeTeam": { "name": "Houston Texans", "coach": "Don Cane" },
    "score": { "away": 15, "home": 7, "quarters": { "away":[3,0,9,3],"home":[0,7,0,0]} },
    "kicking": { "away":{"fg":"2/2","ep":"1/1","cp":"0/0","punt":7}, "home":{"fg":"0/0","ep":"1/1","cp":"0/0","punt":6} },
    "downs": { "away":{"third":"5/16","fourth":"0/0","first":16}, "home":{"third":"6/18","fourth":"0/4","first":15} },
    "passing": { "away":{"cmpAtt":"21/42","yards":212,"long":27,"pct":50,"td":0,"int":1,"hurries":10,"sacks":6}, "home":{"cmpAtt":"18/41","yards":202,"long":27,"pct":44,"td":1,"int":1,"hurries":6,"sacks":6} },
    "rushing": { "away":{"att":9,"yards":3,"long":6,"avg":0.3,"td":1,"fum":1,"qb":"3 for -6"}, "home":{"att":27,"yards":84,"long":10,"avg":3.1,"td":1,"fum":1,"qb":"1 for -1"} },
    "returns": { "away":{"kr":"1 for 14","pr":"5 for 29","fumR":"1 for 39"}, "home":{"kr":"0 for 0","pr":"3 for 10","fumR":"1 for 5"} },
    "playCalls": { "away":{"fm":"T D","run":"PW OR","pass":"SL LL","def":"FD WC"}, "home":{"fm":"I D","run":"DW TR","pass":"SL SP","def":"JB OV"} }
  },
  {
    "week": 2,
    "gameNumber": 5,
    "awayTeam": { "name": "Las Vegas Raiders", "coach": "Paul Nevett" },
    "homeTeam": { "name": "Los Angeles Chargers", "coach": "Matt White" },
    "score": { "away": 0, "home": 23, "quarters": { "away":[0,0,0,0],"home":[10,6,0,7]} },
    "kicking": { "away":{"fg":"0/0","ep":"0/0","cp":"0/0","punt":8}, "home":{"fg":"3/3","ep":"2/2","cp":"0/0","punt":6} },
    "downs": { "away":{"third":"3/14","fourth":"0/2","first":10}, "home":{"third":"5/16","fourth":"0/0","first":10} },
    "passing": { "away":{"cmpAtt":"20/39","yards":262,"long":37,"pct":51,"td":0,"int":1,"hurries":14,"sacks":3}, "home":{"cmpAtt":"8/16","yards":89,"long":51,"pct":50,"td":2,"int":0,"hurries":7,"sacks":1} },
    "rushing": { "away":{"att":16,"yards":20,"long":6,"avg":1.3,"td":0,"fum":1,"qb":"1 for -1"}, "home":{"att":35,"yards":82,"long":10,"avg":2.3,"td":0,"fum":2,"qb":"2 for 6"} },
    "returns": { "away":{"kr":"4 for 44","pr":"1 for 4","fumR":"0 for 0"}, "home":{"kr":"1 for 37","pr":"7 for 90","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"T C","run":"OR RT","pass":"DL FP","def":"LB RD"}, "home":{"fm":"A Z","run":"SW DW","pass":"DL SO","def":"RD BZ"} }
  },
  {
    "week": 2,
    "gameNumber": 6,
    "awayTeam": { "name": "Kansas City Chiefs", "coach": "Diane Findlay" },
    "homeTeam": { "name": "Seattle Seahawks", "coach": "Alan Seward" },
    "score": { "away": 24, "home": 17, "quarters": { "away":[7,0,10,7],"home":[0,10,7,0]} },
    "kicking": { "away":{"fg":"1/1","ep":"3/3","cp":"0/0","punt":3}, "home":{"fg":"1/1","ep":"2/2","cp":"0/0","punt":4} },
    "downs": { "away":{"third":"6/12","fourth":"1/1","first":23}, "home":{"third":"7/13","fourth":"0/0","first":20} },
    "passing": { "away":{"cmpAtt":"23/37","yards":289,"long":40,"pct":62,"td":1,"int":1,"hurries":2,"sacks":4}, "home":{"cmpAtt":"10/21","yards":172,"long":35,"pct":48,"td":2,"int":2,"hurries":4,"sacks":5} },
    "rushing": { "away":{"att":21,"yards":123,"long":37,"avg":5.9,"td":2,"fum":1,"qb":"0 for 0"}, "home":{"att":40,"yards":163,"long":9,"avg":4.1,"td":0,"fum":1,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"2 for 73","pr":"3 for 50","fumR":"2 for 17"}, "home":{"kr":"4 for 69","pr":"0 for 0","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"U I","run":"TR DR","pass":"SL SO","def":"BZ KB"}, "home":{"fm":"I A","run":"DW SW","pass":"DL OS","def":"MD RD"} }
  },
  {
    "week": 2,
    "gameNumber": 7,
    "awayTeam": { "name": "Dallas Cowboys", "coach": "Eric Hoffman" },
    "homeTeam": { "name": "New York Giants", "coach": "Kevin Wallis" },
    "score": { "away": 28, "home": 31, "quarters": { "away":[7,7,7,7],"home":[3,7,14,7]} },
    "kicking": { "away":{"fg":"1/0","ep":"4/4","cp":"0/0","punt":2}, "home":{"fg":"1/1","ep":"4/4","cp":"0/0","punt":3} },
    "downs": { "away":{"third":"11/14","fourth":"0/0","first":26}, "home":{"third":"6/11","fourth":"0/0","first":28} },
    "passing": { "away":{"cmpAtt":"21/41","yards":352,"long":28,"pct":51,"td":3,"int":1,"hurries":3,"sacks":2}, "home":{"cmpAtt":"24/38","yards":361,"long":40,"pct":63,"td":3,"int":0,"hurries":3,"sacks":3} },
    "rushing": { "away":{"att":21,"yards":96,"long":19,"avg":4.6,"td":1,"fum":1,"qb":"1 for 18"}, "home":{"att":19,"yards":65,"long":13,"avg":3.4,"td":1,"fum":1,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"2 for 52","pr":"0 for 0","fumR":"0 for 0"}, "home":{"kr":"4 for 86","pr":"2 for 14","fumR":"1 for 13"} },
    "playCalls": { "away":{"fm":"C A","run":"SW RO","pass":"DP DL","def":"RD FD"}, "home":{"fm":"T U","run":"RL LT","pass":"LO DL","def":"RD MD"} }
  },
  {
    "week": 2,
    "gameNumber": 8,
    "awayTeam": { "name": "Washington Commanders", "coach": "Phillip Haggis" },
    "homeTeam": { "name": "Philadelphia Eagles", "coach": "Chris Weeks" },
    "score": { "away": 10, "home": 30, "quarters": { "away":[0,7,0,3],"home":[7,6,7,10]} },
    "kicking": { "away":{"fg":"1/1","ep":"1/1","cp":"0/0","punt":6}, "home":{"fg":"3/3","ep":"3/3","cp":"0/0","punt":2} },
    "downs": { "away":{"third":"1/10","fourth":"0/1","first":9}, "home":{"third":"10/17","fourth":"0/0","first":29} },
    "passing": { "away":{"cmpAtt":"14/29","yards":138,"long":25,"pct":48,"td":0,"int":1,"hurries":1,"sacks":3}, "home":{"cmpAtt":"19/35","yards":278,"long":74,"pct":54,"td":3,"int":1,"hurries":6,"sacks":0} },
    "rushing": { "away":{"att":12,"yards":51,"long":17,"avg":4.2,"td":1,"fum":0,"qb":"0 for 0"}, "home":{"att":44,"yards":177,"long":11,"avg":4.0,"td":1,"fum":1,"qb":"1 for -4"} },
    "returns": { "away":{"kr":"4 for 58","pr":"2 for 7","fumR":"0 for 0"}, "home":{"kr":"3 for 77","pr":"4 for 11","fumR":"1 for 8"} },
    "playCalls": { "away":{"fm":"B A","run":"RT RW","pass":"SL SC","def":"PD RD"}, "home":{"fm":"A E","run":"DR SW","pass":"DI LI","def":"BZ SS"} }
  },
  {
    "week": 2,
    "gameNumber": 9,
    "awayTeam": { "name": "Green Bay Packers", "coach": "Bernard Brady" },
    "homeTeam": { "name": "Minnesota Vikings", "coach": "Mike Smith" },
    "score": { "away": 14, "home": 24, "quarters": { "away":[9,0,5,0],"home":[0,14,3,7]} },
    "kicking": { "away":{"fg":"2/1","ep":"1/1","cp":"0/0","punt":7}, "home":{"fg":"1/1","ep":"3/3","cp":"0/0","punt":5} },
    "downs": { "away":{"third":"3/15","fourth":"1/2","first":11}, "home":{"third":"7/15","fourth":"0/0","first":24} },
    "passing": { "away":{"cmpAtt":"9/20","yards":109,"long":23,"pct":45,"td":1,"int":0,"hurries":4,"sacks":3}, "home":{"cmpAtt":"25/40","yards":266,"long":27,"pct":63,"td":1,"int":1,"hurries":10,"sacks":5} },
    "rushing": { "away":{"att":33,"yards":139,"long":32,"avg":4.2,"td":0,"fum":0,"qb":"0 for 0"}, "home":{"att":28,"yards":113,"long":14,"avg":4.0,"td":2,"fum":0,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"0 for 0","pr":"1 for 6","fumR":"0 for 0"}, "home":{"kr":"2 for 49","pr":"1 for 6","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"J I","run":"RT TW","pass":"OP LO","def":"RD TS"}, "home":{"fm":"A T","run":"RC RI","pass":"SI DP","def":"RD BZ"} }
  },
  {
    "week": 2,
    "gameNumber": 10,
    "awayTeam": { "name": "Chicago Bears", "coach": "Jonathan Miles" },
    "homeTeam": { "name": "Detroit Lions", "coach": "Scott Kramer" },
    "score": { "away": 2, "home": 20, "quarters": { "away":[0,0,0,2],"home":[7,6,7,0]} },
    "kicking": { "away":{"fg":"1/0","ep":"0/0","cp":"0/0","punt":6}, "home":{"fg":"2/2","ep":"2/2","cp":"0/0","punt":3} },
    "downs": { "away":{"third":"1/12","fourth":"0/3","first":10}, "home":{"third":"10/18","fourth":"0/0","first":20} },
    "passing": { "away":{"cmpAtt":"14/34","yards":130,"long":15,"pct":41,"td":0,"int":1,"hurries":1,"sacks":5}, "home":{"cmpAtt":"18/35","yards":229,"long":29,"pct":51,"td":0,"int":2,"hurries":1,"sacks":7} },
    "rushing": { "away":{"att":13,"yards":13,"long":6,"avg":1.0,"td":0,"fum":0,"qb":"0 for 0"}, "home":{"att":26,"yards":82,"long":6,"avg":3.2,"td":2,"fum":1,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"3 for 48","pr":"1 for 6","fumR":"3 for 39"}, "home":{"kr":"1 for 27","pr":"5 for 24","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"C I","run":"RT","pass":"SL SO","def":"RD MD"}, "home":{"fm":"I A","run":"SW RT","pass":"DL SI","def":"RD PD"} }
  },
  {
    "week": 2,
    "gameNumber": 11,
    "awayTeam": { "name": "Carolina Panthers", "coach": "Graham Bates" },
    "homeTeam": { "name": "San Francisco 49ers", "coach": "Dave Smart" },
    "score": { "away": 37, "home": 14, "quarters": { "away":[7,6,14,10],"home":[0,7,0,7]} },
    "kicking": { "away":{"fg":"3/3","ep":"4/4","cp":"0/0","punt":3}, "home":{"fg":"0/0","ep":"2/2","cp":"0/0","punt":8} },
    "downs": { "away":{"third":"8/13","fourth":"0/0","first":21}, "home":{"third":"5/14","fourth":"0/1","first":18} },
    "passing": { "away":{"cmpAtt":"13/22","yards":137,"long":31,"pct":59,"td":0,"int":0,"hurries":5,"sacks":0}, "home":{"cmpAtt":"19/31","yards":255,"long":31,"pct":61,"td":1,"int":0,"hurries":5,"sacks":2} },
    "rushing": { "away":{"att":41,"yards":154,"long":9,"avg":3.8,"td":3,"fum":0,"qb":"0 for 0"}, "home":{"att":25,"yards":71,"long":7,"avg":2.8,"td":1,"fum":0,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"2 for 119","pr":"5 for 67","fumR":"0 for 0"}, "home":{"kr":"5 for 117","pr":"0 for 0","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"A J","run":"SW TR","pass":"SI DL","def":"KB WC"}, "home":{"fm":"O H","run":"RC RT","pass":"DL DP","def":"LD OV"} }
  },
  {
    "week": 2,
    "gameNumber": 12,
    "awayTeam": { "name": "Los Angeles Rams", "coach": "Todd Hastings" },
    "homeTeam": { "name": "Atlanta Falcons", "coach": "Lee Dunstan" },
    "score": { "away": 20, "home": 10, "quarters": { "away":[3,3,0,14],"home":[0,0,7,3]} },
    "kicking": { "away":{"fg":"3/2","ep":"2/2","cp":"0/0","punt":8}, "home":{"fg":"1/1","ep":"1/1","cp":"0/0","punt":5} },
    "downs": { "away":{"third":"4/16","fourth":"0/0","first":14}, "home":{"third":"5/13","fourth":"0/2","first":17} },
    "passing": { "away":{"cmpAtt":"12/22","yards":143,"long":25,"pct":55,"td":0,"int":0,"hurries":0,"sacks":1}, "home":{"cmpAtt":"15/32","yards":168,"long":24,"pct":47,"td":0,"int":2,"hurries":7,"sacks":4} },
    "rushing": { "away":{"att":38,"yards":116,"long":11,"avg":3.1,"td":2,"fum":0,"qb":"1 for -1"}, "home":{"att":35,"yards":163,"long":15,"avg":4.7,"td":1,"fum":2,"qb":"0 for 0"} },
    "returns": { "away":{"kr":"3 for 43","pr":"5 for 36","fumR":"3 for 59"}, "home":{"kr":"5 for 131","pr":"3 for 19","fumR":"0 for 0"} },
    "playCalls": { "away":{"fm":"I G","run":"SW OR","pass":"SI DL","def":"MD BZ"}, "home":{"fm":"T I","run":"RL CW","pass":"QL SI","def":"OV ZS"} }
  },
]

// Convert and export Week 2 games
export const week2Games: Game[] = week2GamesData.map(convertWeek2Game)

export async function getWeek2Games(): Promise<Game[]> {
  return week2Games
}

export async function getWeek2GameById(gameId: string): Promise<Game | undefined> {
  return week2Games.find(game => game.id === gameId)
}

