const http = require('http')
const router = require('./Route/app.route')
const connectDB = require('./db/mongodb')
const config = require('./config/env')

async function startServer() {
    const db = await connectDB()

    const server = http.createServer((req, res) => {
        router.appRoutes(req, res, db)
    })

    server.listen(config.port, config.host, () => {
        console.log(`Сервер запущен: http://${host}:${port}`)
    })
}

startServer()