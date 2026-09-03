const express = require('express')


class Server {

    constructor(config, router, database) {

        this.config = config

        this.router = router

        this.database = database


        this.app = express()


        this.app.use(express.json())

        this.app.use(this.router.getRouter())
    }


    async start() {

        await this.database.connect()


        this.app.listen(this.config.port, this.config.host,() => {
                console.log(
                    `Сервер запущен: http://${this.config.host}:${this.config.port}`
                )
            }
        )
    }
}


module.exports = Server