const service = require('../Service/app.service')
const validation = require('../Validation/app.validation')


async function getList(req, res, db) {
    try {
        const url = new URL(req.url, 'http://localhost')

        const offset = Number(url.searchParams.get('offset')) || 0
        const limit = Number(url.searchParams.get('limit')) || 10

        const items = await service.getAllItems(db, offset, limit)

        res.writeHead(200)

        res.end(JSON.stringify(items))

    } catch (error) {
        res.writeHead(500)

        res.end(JSON.stringify({
            message: 'Internal server error'
        }))
    }
}


async function getById(req, res, db) {
    try {
        const id = req.url.split('/')[2]

        const item = await service.getItemById(db, id)

        res.writeHead(200)

        res.end(JSON.stringify(item))

    } catch (error) {
        res.writeHead(404)

        res.end(JSON.stringify({
            message: error.message
        }))
    }
}


async function create(req, res, db) {
    try {
        const body = await getRequestBody(req)

        const itemData = JSON.parse(body)

        const { error, value } = validation.itemSchema.validate(itemData)

        if (error) {
            res.writeHead(400)

            return res.end(JSON.stringify({
                message: error.details[0].message
            }))
        }

        const item = await service.createItem(db, value)

        res.writeHead(201)

        res.end(JSON.stringify(item))

    } catch (error) {
        res.writeHead(400)

        res.end(JSON.stringify({
            message: error.message
        }))
    }
}


async function update(req, res, db) {
    try {
        const id = req.url.split('/')[3]

        const body = await getRequestBody(req)

        const itemData = JSON.parse(body)

        const { error, value } = validation.itemSchema.validate(itemData)

        if (error) {
            res.writeHead(400)

            return res.end(JSON.stringify({
                message: error.details[0].message
            }))
        }

        const item = await service.updateItem(db, id, value)

        res.writeHead(200)

        res.end(JSON.stringify(item))

    } catch (error) {
        res.writeHead(400)

        res.end(JSON.stringify({
            message: error.message
        }))
    }
}


async function remove(req, res, db) {
    try {
        const id = req.url.split('/')[2]

        const item = await service.deleteItem(db, id)

        res.writeHead(200)

        res.end(JSON.stringify(item))

    } catch (error) {
        res.writeHead(404)

        res.end(JSON.stringify({
            message: error.message
        }))
    }
}


function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            resolve(body)
        })

        req.on('error', error => {
            reject(error)
        })
    })
}


module.exports = {
    getList,
    getById,
    create,
    update,
    remove
}