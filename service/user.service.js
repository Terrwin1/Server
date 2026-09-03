class UserService {

    constructor(user, tokenService) {
        this.user = user
        this.tokenService = tokenService
    }


    async register(login, password) {

        const existingUser =
            await this.user.findOne({
                login: login
            })


        if (existingUser) {
            throw new Error('User already exists')
        }


        const user =
            await this.user.create({
                login: login,
                password: password
            })


        return user
    }


    async login(login, password) {

        const user =
            await this.user.findOne({
                login: login
            })


        if (!user) {
            throw new Error(
                'Invalid login or password'
            )
        }


        if (user.password !== password) {
            throw new Error(
                'Invalid login or password'
            )
        }


        const token =
            await this.tokenService.createToken(
                user._id
            )


        return token
    }
}


module.exports = UserService