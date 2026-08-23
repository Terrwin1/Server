const controller = require('../controller/app.controller')

function appRoutes(req, res) {
    if (req.method === 'GET' && req.url === '/app/list') {
        return controller.getList(req, res)
    }

    if (req.method === 'GET' && req.url.startsWith('/app/')) {
        return controller.getById(req, res)
    }

    if (req.method === 'POST' && req.url === '/app/create') {
        return controller.create(req, res)
    }

    if (req.method === 'PUT' && req.url.startsWith('/app/update/')) {
        return controller.update(req, res)
    }

    if (req.method === 'DELETE' && req.url.startsWith('/app/')) {
        return controller.remove(req, res)
    }

    res.writeHead(404)

    res.end(JSON.stringify({
        message: 'Route not found'
    }))
}

module.exports = {
    appRoutes
}