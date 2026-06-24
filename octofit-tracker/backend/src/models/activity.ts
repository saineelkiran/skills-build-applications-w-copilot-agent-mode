import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  durationMinutes: number
  distanceKm?: number
  calories?: number
  date: Date
  workout?: Types.ObjectId
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  calories: Number,
  workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IActivity>('Activity', ActivitySchema)
