require('dotenv').config()


module.exports = {

    host: process.env.HOST,

    port: process.env.PORT,

    mongoUri: process.env.MONGO_URI,

    mongoDbName: process.env.MONGO_DB_NAME,

    jwtSecret: process.env.JWT_SECRET,

    jwtExpiresIn: process.env.JWT_EXPIRES_IN

}