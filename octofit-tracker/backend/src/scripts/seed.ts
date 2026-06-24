import mongoose from 'mongoose'

// Seed the octofit_db database with test data
async function seed() {
  const MONGO = 'mongodb://localhost:27017/octofit_db'
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO)

  // dynamically import models (works with ESM loader)
  const UserMod = await import(new URL('../models/user.ts', import.meta.url).href)
  const TeamMod = await import(new URL('../models/team.ts', import.meta.url).href)
  const WorkoutMod = await import(new URL('../models/workout.ts', import.meta.url).href)
  const ActivityMod = await import(new URL('../models/activity.ts', import.meta.url).href)
  const LeaderboardMod = await import(new URL('../models/leaderboard.ts', import.meta.url).href)

  const User = UserMod.default
  const Team = TeamMod.default
  const Workout = WorkoutMod.default
  const Activity = ActivityMod.default
  const Leaderboard = LeaderboardMod.default

  // clear
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Users
  const [alice, bob, carol] = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com' },
    { name: 'Bob Chen', email: 'bob@example.com' },
    { name: 'Carol Singh', email: 'carol@example.com' }
  ])

  // Teams
  const [teamOcto, teamKraken] = await Team.create([
    { name: 'Team Octo', members: [alice._id, bob._id] },
    { name: 'Team Kraken', members: [carol._id] }
  ])

  // Workouts
  const [fullBody, cardio] = await Workout.create([
    {
      title: 'Full Body Blast',
      description: 'Compound movements for strength',
      exercises: [
        { name: 'Squats', reps: 8, sets: 3 },
        { name: 'Push-ups', reps: 12, sets: 3 },
        { name: 'Plank', durationMinutes: 2 }
      ],
      durationMinutes: 45,
      difficulty: 'medium'
    },
    {
      title: 'Morning Cardio',
      description: 'Easy run and mobility',
      exercises: [{ name: 'Run', durationMinutes: 30 }],
      durationMinutes: 30,
      difficulty: 'easy'
    }
  ])

  // Activities
  await Activity.create([
    { user: alice._id, type: 'run', durationMinutes: 32, distanceKm: 5.2, calories: 320, workout: cardio._id },
    { user: bob._id, type: 'strength', durationMinutes: 50, calories: 420, workout: fullBody._id },
    { user: carol._id, type: 'run', durationMinutes: 28, distanceKm: 4.8, calories: 290, workout: cardio._id }
  ])

  // Leaderboard (simple sample scores)
  await Leaderboard.create([
    { user: alice._id, score: 820 },
    { user: bob._id, score: 760 },
    { user: carol._id, score: 700 },
    { team: teamOcto._id, score: 1580 },
    { team: teamKraken._id, score: 700 }
  ])

  console.log('Seed complete: created users, teams, workouts, activities, leaderboard entries')

  // verify counts
  const [uCount, tCount, wCount, aCount, lCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Workout.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments()
  ])
  console.log({ users: uCount, teams: tCount, workouts: wCount, activities: aCount, leaderboard: lCount })

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed', err)
  process.exit(1)
})
