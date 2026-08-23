const fs = require('fs/promises')

const path = './db.json'

async function readItems() {
    const data = await fs.readFile(path, 'utf-8')

    return JSON.parse(data)
}

async function saveItems(items) {
    const data = JSON.stringify(items, null, 2)

    await fs.writeFile(path, data)
}

async function getAllItems() {
    return await readItems()
}

async function getItemById(id) {
    const items = await readItems()

    return items.find(user => user.id === id)
}

async function createItem(itemData) {
    const items = await readItems()

    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        name: itemData.name,
        description: itemData.description,
        date: new Date().toISOString()
    }

    items.push(newItem)

    await saveItems(items)

    return newItem
}

async function updateItem(id, itemData) {
    const items = await readItems()

    const item = items.find(item => item.id === id)

    if (!item) {
        return null
    }

    item.name = itemData.name
    item.description = itemData.description

    await saveItems(items)

    return item
}

async function deleteItem(id) {
    const items = await readItems()

    const index = items.findIndex(item => item.id === id)

    if (index === -1) {
        return null
    }

    const deletedItem = items.splice(index, 1)[0]
    
    await saveItems(items)

    return deletedItem
}

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}