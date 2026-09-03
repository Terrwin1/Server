const jwt = require('jsonwebtoken')


class TokenService {

    constructor(token, config) {
        this.token = token
        this.config = config
    }


    generateToken(userId) {

        return jwt.sign(
            {
                userId: userId
            },
            this.config.jwtSecret,
            {
                expiresIn: this.config.jwtExpiresIn
            }
        )
    }


    async createToken(userId) {

        const token =
            this.generateToken(userId)


        await this.token.create({
            token: token,
            userId: userId
        })


        return token
    }


    async getToken(token) {

        return await this.token.findOne({
            token: token
        })
    }


    async deleteToken(token) {

        const result =
            await this.token.findOneAndDelete({
                token: token
            })


        if (!result) {
            throw new Error('Token not found')
        }


        return result
    }
}


module.exports = TokenService