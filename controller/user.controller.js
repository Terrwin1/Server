const validation = require('../Validation/user.validation')


class UserController {

    constructor(userService) {
        this.userService = userService
    }


    async register(req, res) {

        try {

            const userData = req.body


            const {error, value} =
                validation.registerSchema.validate(
                    userData
                )


            if (error) {

                return res.status(400).json({
                        message: error.details[0].message
                    })
            }


            const user = await this.userService.register(
                    value.login,
                    value.password
                )


            return res.status(201).json({
                    message: 'User registered successfully',

                    user: {
                        id: user._id,
                        login: user.login
                    }
                })

        } catch (error) {

            return res.status(400).json({
                    message: error.message
                })
        }
    }


    async login(req, res) {

        try {

            const userData = req.body


            const {error, value} =
                validation.loginSchema.validate(
                    userData
                )


            if (error) {

                return res.status(400).json({
                        message: error.details[0].message
                    })
            }


            const token = await this.userService.login(
                    value.login,
                    value.password
                )


            return res.status(200).json({
                    token: token
                })

        } catch (error) {

            return res.status(401).json({
                    message: error.message
                })
        }
    }
}


module.exports = UserController