require('dotenv').config()

module.exports = {
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DB_NAME,
    host: process.env.HOST,
    port: Number(process.env.PORT)
}