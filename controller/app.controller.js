class Controller {

    constructor(service, validation) {
        this.service = service
        this.validation = validation
    }


    async getList(req, res) {

        try {

            const offset = Number(req.query.offset) || 0

            const limit = Number(req.query.limit) || 10


            const items = await this.service.getAllItems(
                    offset,
                    limit
                )

            return res.status(200).json(items)

        } catch (error) {

            return res.status(500).json({
                    message: 'Internal server error'
                })
        }
    }


    async getByCategory(req, res) {

        try {

            const category = decodeURIComponent(req.params.category)

            const offset = Number(req.query.offset) || 0

            const limit = Number(req.query.limit) || 10


            const items = await this.service.getByCategory(
                    category,
                    offset,
                    limit
                )


            return res.status(200).json(items)

        } catch (error) {

            return res.status(500).json({
                    message: error.message
                })
        }
    }


    async getById(req, res) {

        try {

            const id = req.params.id

            const item = await this.service.getItemById(id)

            return res.status(200).json(item)

        } catch (error) {

            return res.status(404).json({
                    message: error.message
                })
        }
    }


    async create(req, res) {

        try {

            const itemData = req.body

            const {error, value} =
                this.validation.itemSchema.validate(
                    itemData
                )


            if (error) {

                return res.status(400).json({
                        message:
                            error.details[0].message
                    })
            }


            const item = await this.service.createItem(
                    value
                )


            return res.status(201).json(item)

        } catch (error) {

            return res.status(400).json({
                    message: error.message
                })
        }
    }


    async update(req, res) {

        try {

            const id = req.params.id

            const itemData = req.body

            const {error, value} =
                this.validation.itemSchema.validate(
                    itemData
                )


            if (error) {

                return res.status(400).json({
                        message:
                            error.details[0].message
                    })
            }


            const item = await this.service.updateItem(
                    id,
                    value
                )


            return res.status(200).json(item)

        } catch (error) {

            return res.status(400).json({
                    message: error.message
                })
        }
    }


    async remove(req, res) {

        try {

            const id = req.params.id


            const item = await this.service.deleteItem(
                    id
                )


            return res.status(200).json(item)

        } catch (error) {

            return res.status(404).json({
                    message: error.message
                })
        }
    }
}


module.exports = Controller