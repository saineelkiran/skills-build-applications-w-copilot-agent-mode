import mongoose, { Schema, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user?: Types.ObjectId
  team?: Types.ObjectId
  score: number
  createdAt: Date
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema)
