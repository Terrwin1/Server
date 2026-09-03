const mongoose = require('mongoose')


class Database {

    constructor(config) {
        this.config = config
    }


    async connect() {

        await mongoose.connect(
            this.config.mongoUri,
            {
                dbName: this.config.mongoDbName
            }
        )


        console.log('DB connected')
    }
}


module.exports = Database