const express = require('express')
const multerConfig = require('./config/multer')
const uploader = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/login', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', uploader.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', (req, res) => res.render('dashboard'))

module.exports = routes
