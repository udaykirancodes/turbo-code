import dotenv from 'dotenv'
dotenv.config()

const serverConfig = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || ''
}

export default serverConfig
