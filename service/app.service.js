class Service {

    constructor(item) {
        this.item = item
    }


    async getAllItems(offset = 0, limit = 10) {

        return await this.item
            .find()
            .skip(offset)
            .limit(limit)
    }


    async getByCategory(
        category,
        offset = 0,
        limit = 10
    ) {

        return await this.item
            .find({
                category: category
            })
            .skip(offset)
            .limit(limit)
    }


    async getItemById(id) {

        const item =
            await this.item.findById(id)


        if (!item) {
            throw new Error('Item not found')
        }


        return item
    }


    async createItem(itemData) {

        const item =
            await this.item.create({
                name: itemData.name,
                category: itemData.category,
                description: itemData.description
            })


        return item
    }


    async updateItem(id, itemData) {

        const item =
            await this.item.findByIdAndUpdate(
                id,
                {
                    name: itemData.name,
                    category: itemData.category,
                    description: itemData.description
                },
                {
                    new: true,
                    runValidators: true
                }
            )


        if (!item) {
            throw new Error('Item not found')
        }


        return item
    }


    async deleteItem(id) {

        const item =
            await this.item.findByIdAndDelete(id)


        if (!item) {
            throw new Error('Item not found')
        }


        return item
    }
}


module.exports = Service