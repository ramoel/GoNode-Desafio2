const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const avatarDefault =
      'https://s3.amazonaws.com/vizzu-uploads/public/avatar.svg'
    if (req.file) {
      const { location } = req.file
      await User.create({ ...req.body, avatar: location })
    } else {
      await User.create({ ...req.body, avatar: avatarDefault })
    }

    return res.redirect('/')
  }
}

module.exports = new UserController()
