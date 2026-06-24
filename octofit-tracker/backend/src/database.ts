import mongoose from 'mongoose'

const DEFAULT_DB = 'octofit_db'
const DEFAULT_URI = `mongodb://localhost:27017/${DEFAULT_DB}`

export const getMongoUri = (): string => process.env.MONGODB_URI || DEFAULT_URI

export async function connectDb(): Promise<typeof mongoose> {
  const uri = getMongoUri()
  await mongoose.connect(uri)
  console.log(`Connected to MongoDB at ${uri}`)
  return mongoose
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect()
}
