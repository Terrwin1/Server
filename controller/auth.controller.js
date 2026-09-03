class AuthController {

    constructor(tokenService) {
        this.tokenService = tokenService
    }


    async logout(req, res) {

        try {

            await this.tokenService.deleteToken(
                req.token
            )

            return res.status(200).json({
                    message: 'Logout successful'
                })

        } catch (error) {

            return res.status(404).json({
                    message: error.message
                })
        }
    }
}


module.exports = AuthController