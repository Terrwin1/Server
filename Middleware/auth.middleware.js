const jwt = require('jsonwebtoken')


class AuthMiddleware {

    constructor(tokenService, user, config) {
        this.tokenService = tokenService
        this.user = user
        this.config = config
    }


    async authenticate(req, res, next) {

        try {

            const authorization =
                req.headers.authorization


            if (!authorization) {

                return res
                    .status(401)
                    .json({
                        message:
                            'Authorization header is required'
                    })
            }


            const [type, token] =
                authorization.split(' ')


            if (type !== 'Bearer' || !token) {

                return res
                    .status(401)
                    .json({
                        message:
                            'Invalid authorization format'
                    })
            }


            const payload =
                jwt.verify(
                    token,
                    this.config.jwtSecret
                )


            const tokenDocument =
                await this.tokenService.getToken(
                    token
                )


            if (!tokenDocument) {

                return res
                    .status(401)
                    .json({
                        message:
                            'Token has been revoked'
                    })
            }


            const user =
                await this.user.findById(
                    payload.userId
                )


            if (!user) {

                return res
                    .status(401)
                    .json({
                        message:
                            'User not found'
                    })
            }


            req.user = user
            req.token = token


            next()

        } catch (error) {

            if (
                error.name === 'TokenExpiredError'
            ) {

                return res
                    .status(401)
                    .json({
                        message: 'Token expired'
                    })
            }


            if (
                error.name === 'JsonWebTokenError'
            ) {

                return res
                    .status(401)
                    .json({
                        message: 'Invalid token'
                    })
            }


            return res
                .status(500)
                .json({
                    message:
                        'Internal server error'
                })
        }
    }
}


module.exports = AuthMiddleware