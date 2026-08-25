const {ObjectId} = require('mongodb')

async function getAllItems(db, offset = 0, limit = 10) {
    const collection = db.collection('items')

    return await collection
    .find()
    .skip(offset)
    .limit(limit)
    .toArray()
}


async function getItemById(db, id) {
    const collection = db.collection('items')

    const item = await collection.findOne({
        _id: new ObjectId(id)
    })

    if (!item) {
        throw new Error('Item not found')
    }

    return item
}


async function createItem(db, itemData) {
    const collection = db.collection('items')

    const newItem = {
        name: itemData.name,
        description: itemData.description,
        date: new Date().toISOString().split('T')[0]
    }

    const result = await collection.insertOne(newItem)

    return {
        _id: result.insertedId,
        ...newItem
    }
}

async function updateItem(db, id, itemData) {
    const collection = db.collection('items')

    const result = await collection.findOneAndUpdate(
        {
            _id: new ObjectId(id)
        },
        {
            $set: {
                name: itemData.name,
                description: itemData.description
            }
        },
        {
            returnDocument: 'after'
        }
    )

    if (!result) {
        throw new Error('Item not found')
    }

    return result
}


async function deleteItem(db, id) {
    const collection = db.collection('items')

    const item = await collection.findOne({
        _id: new ObjectId(id)
    })

    if (!item) {
        throw new Error('Item not found')
    }

    await collection.deleteOne({
        _id: new ObjectId(id)
    })

    return item
}

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}