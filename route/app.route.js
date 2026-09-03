const express = require('express')


class Router {

    constructor(
        controller,
        userController,
        authController,
        authMiddleware
    ) {

        this.controller = controller
        this.userController = userController
        this.authController = authController
        this.authMiddleware = authMiddleware

        this.router = express.Router()

        this.setupRoutes()
    }


    setupRoutes() {

        this.router.post(
            '/auth/register',
            this.userController.register.bind(
                this.userController
            )
        )

        
        this.router.post(
            '/auth/login',
            this.userController.login.bind(
                this.userController
            )
        )


        this.router.post(
            '/auth/logout',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.authController.logout.bind(
                this.authController
            )
        )


        this.router.get(
            '/app/list',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.getList.bind(
                this.controller
            )
        )


        this.router.get(
            '/app/category/:category',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.getByCategory.bind(
                this.controller
            )
        )


        this.router.get(
            '/app/:id',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.getById.bind(
                this.controller
            )
        )


        this.router.post(
            '/app/create',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.create.bind(
                this.controller
            )
        )


        this.router.put(
            '/app/update/:id',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.update.bind(
                this.controller
            )
        )


        this.router.delete(
            '/app/delete/:id',
            this.authMiddleware.authenticate.bind(
                this.authMiddleware
            ),
            this.controller.remove.bind(
                this.controller
            )
        )
    }


    getRouter() {
        return this.router
    }
}


module.exports = Router