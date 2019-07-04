const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { file: { filename: avatar }, body } = req

    await User.create({ ...body, avatar })

    req.flash('success', 'Usuário criado com sucesso')

    return res.redirect('/')
  }
}

module.exports = new UserController()
