# Game Plan

A Next.js application for viewing sports game statistics, standings, schedules, and making predictions.

## Project Structure

```
/app
  /games
    /[gameId]
      page.tsx        # Game stats + comments
  /standings
    page.tsx          # Standings page
  /schedule
    page.tsx          # Schedule page
  /teams
    /[teamId]
      page.tsx        # Team statistics
  layout.tsx          # Root layout
  page.tsx            # Home page

/data
  games.ts            # Game data and functions
  teams.ts            # Team data and functions
  standings.ts        # Standings calculations
  schedule.ts         # Schedule data

/components
  GameStats.tsx       # Game statistics display
  TeamStats.tsx       # Team statistics display
  StandingsTable.tsx  # Standings table component
  ScheduleTable.tsx   # Schedule table component
  CommentsBox.tsx     # Comments component for games
  PredictionWidget.tsx # Prediction widget component

/app/api
  /comments
    /[gameId]
      route.ts        # POST/GET comments per game
  /predictions
    /nextWeek
      route.ts        # POST/GET predictions
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Game Details**: View individual game statistics and comments
- **Standings**: View league standings with win/loss records
- **Schedule**: Browse upcoming and past games
- **Team Stats**: View detailed team statistics
- **Comments**: Add and view comments on games
- **Predictions**: Make predictions for upcoming games

## Data Storage

Currently, the application uses in-memory storage for comments and predictions. In production, you should replace this with a proper database (e.g., PostgreSQL, MongoDB, or a service like Supabase).

## Next Steps

- Connect to a real data source for games, teams, standings, and schedule
- Implement user authentication for comments and predictions
- Add database persistence for comments and predictions
- Enhance UI/UX with better styling (consider using Tailwind CSS or a component library)
- Add more features like game highlights, player stats, etc.

# Game-Plan-Football
