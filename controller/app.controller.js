const service = require('../service/app.service')

async function getList(req, res) {
    const items = await service.getAllItems()

    res.writeHead(200)

    res.end(JSON.stringify(items))
}

async function getById(req, res) {
    const id = Number(req.url.split('/')[2])

    const item = await service.getItemById(id)

    if (!item) {
        res.writeHead(404)

        return res.end(JSON.stringify({
            message: 'Item not found'
        }))
    }

    res.writeHead(200)

    res.end(JSON.stringify(item))
}

async function create(req, res) {
    try {
        const body = await getRequestBody(req)

        const itemData = JSON.parse(body)

        const item = await service.createItem(itemData)

        res.writeHead(201)

        res.end(JSON.stringify(item))
    } catch (error) {
        res.writeHead(400)

        res.end(JSON.stringify({
            message: 'Invalid request body'
        }))
    }
}

async function update(req, res) {
    try {
        const id = Number(req.url.split('/')[3])

        const body = await getRequestBody(req)

        const itemData = JSON.parse(body)

        const item = await service.updateItem(id, itemData)

        if(!item) {
            res.writeHead(404)

            return res.end(JSON.stringify({
                message: 'Item not found'
            }))
        }

        res.writeHead(200)
        
        res.end(JSON.stringify(item))
    } catch (error) {
        res.writeHead(400)

        res.end(JSON.stringify({
            message: 'Invalid request body'
        }))
    }
}

async function remove(req, res) {
    const id = Number(req.url.split('/')[2])

    const item = await service.deleteItem(id)

    if (!item) {
        res.writeHead(404)

        return res.end(JSON.stringify({
            message: 'item not found'
        }))
    }

    res.writeHead(200)

    res.end(JSON.stringify(item))
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