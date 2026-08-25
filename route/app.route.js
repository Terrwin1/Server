const controller = require('../Controller/app.controller')

function appRoutes(req, res, db) {

    if (req.method === 'GET' && /^\/app\/list(?:\?.*)?$/.test(req.url)) {
        return controller.getList(req, res, db)
    }

    if (req.method === 'GET' && /^\/app\/[a-fA-F0-9]{24}$/.test(req.url)) {
        return controller.getById(req, res, db)
    }

    if (req.method === 'POST' && req.url === '/app/create') {
        return controller.create(req, res, db)
    }

    if (req.method === 'PUT' && /^\/app\/update\/[a-fA-F0-9]{24}$/.test(req.url)) {
        return controller.update(req, res, db)
    }

    if (req.method === 'DELETE' && /^\/app\/delete\/[a-fA-F0-9]{24}$/.test(req.url)) {
        return controller.remove(req, res, db)
    }

    res.writeHead(404, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
        message: 'Route not found'
    }))
}

module.exports = {
    appRoutes
}