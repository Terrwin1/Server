const container = require('./container/container')


const server = container.resolve('server')


server.start()