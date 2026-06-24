import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  exercises: { name: string; reps?: number; sets?: number; durationMinutes?: number }[]
  durationMinutes?: number
  difficulty?: 'easy'|'medium'|'hard'
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: String,
  exercises: [{ name: String, reps: Number, sets: Number, durationMinutes: Number }],
  durationMinutes: Number,
  difficulty: { type: String, enum: ['easy','medium','hard'] },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
