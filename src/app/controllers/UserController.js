const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store ({ body, file }, res) {
    const { filename: avatar } = file

    await User.create({ ...body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
