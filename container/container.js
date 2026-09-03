const {
    createContainer,
    asClass,
    asValue,
    InjectionMode
} = require('awilix')

const Server = require('../servers/server')

const Controller = require('../Controller/app.controller')
const UserController = require('../Controller/user.controller')
const AuthController = require('../Controller/auth.controller')

const Service = require('../Service/app.service')
const UserService = require('../Service/user.service')
const TokenService = require('../Service/token.service')

const AuthMiddleware = require('../Middleware/auth.middleware')

const Router = require('../Route/app.route')

const Database = require('../db/mongodb')

const Item = require('../model/item.model')
const User = require('../model/user.model')
const Token = require('../model/token.model')

const validation = require('../Validation/app.validation')

const config = require('../config/env')


const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
})

container.register({

    item: asValue(Item),
    user: asValue(User),
    token: asValue(Token),

    validation: asValue(validation),
    config: asValue(config),

    server: asClass(Server).singleton(),

    database: asClass(Database).singleton(),

    service: asClass(Service).singleton(),
    userService: asClass(UserService).singleton(),
    tokenService: asClass(TokenService).singleton(),

    authMiddleware: asClass(AuthMiddleware).singleton(),

    controller: asClass(Controller).singleton(),
    userController: asClass(UserController).singleton(),
    authController: asClass(AuthController).singleton(),

    router: asClass(Router).singleton()
})


module.exports = container