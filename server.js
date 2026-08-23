const http = require('http')
const router = require('./route/app.route')

const host = '127.0.0.1'
const port = 3000


const server = http.createServer((req, res) => {
    router.appRoutes(req, res)
})

server.listen(port, host, () => {
    console.log(`Сервер запущен: http://${host}:${port}`)
})