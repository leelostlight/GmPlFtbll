// Helper function to get team logo path
export function getTeamLogoPath(teamName: string): string {
  // Map team names to their logo file names
  // Handle variations in naming and typos
  const logoMap: Record<string, string> = {
    'New York Jets': 'new-york-jets.png',
    'Buffalo Bills': 'buffalo-bills.png',
    'Miami Dolphins': 'miami-dolphins.png',
    'New England Patriots': 'new-england-patriots.png',
    'Baltimore Ravens': 'baltimore-ravens.png',
    'Cincinnati Bengals': 'Cincinnati-Bengals.png',
    'Tennessee Titans': 'tennessee-titans.png',
    'Houston Texans': 'houston-texans.png',
    'Kansas City Chiefs': 'kansas-city-chiefs.png',
    'Las Vegas Raiders': 'las-vegas-raiders.png',
    'Los Angeles Chargers': 'los-angeles-chargers.png',
    'Seattle Seahawks': 'seattle-seahawks.png',
    'Dallas Cowboys': 'dallas-cowboys.png',
    'New York Giants': 'new-yourk-giants.png', // Handle typo in filename
    'Philadelphia Eagles': 'philadelphia-eagles.png',
    'Washington Commands': 'washington-commanders.png', // Handle name difference
    'Chicago Bears': 'chicago-bears.png',
    'Detroit Lions': 'detroit-lions.png',
    'Green Bay Packers': 'green-bay-packers.png',
    'Minnesota Vikings': 'Minnesota-Vikings.png',
    'Atlanta Falcons': 'atlanta-falcons.png',
    'Carolina Panthers': 'carolina-panthers.png',
    'Los Angeles Rams': 'los-angeles-rams.png',
    'San Francisco 49ers': 'san-francisco-49ers.png',
  }

  const logoFileName = logoMap[teamName]
  if (!logoFileName) {
    // Fallback: try to generate from team name
    const fallback = teamName.toLowerCase().replace(/\s+/g, '-') + '.png'
    return `/assets/logos/Logos/${fallback}`
  }

  return `/assets/logos/Logos/${logoFileName}`
}

// Helper function to get conference logo path
export function getConferenceLogoPath(conference: string): string {
  const conferenceMap: Record<string, string> = {
    'AFC': 'Afc-Logo.png',
    'NFC': 'NFC-Logo.png',
  }
  
  const logoFileName = conferenceMap[conference]
  if (!logoFileName) {
    return ''
  }
  
  // Try images folder first, then logos folder
  return `/assets/images/${logoFileName}`
}

