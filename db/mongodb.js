const { MongoClient } = require('mongodb')
const config = require('../config/env')

const client = new MongoClient(config.mongoUri)

async function connectDB() {
    await client.connect()

    console.log('DB connected')

    return client.db(config.mongoDbName)
}

module.exports = connectDB