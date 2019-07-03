const express = require('express')
const multerConfig = require('./config/multer')
const uploader = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')

routes.get('/signup', UserController.create)
routes.post('/signup', uploader.single('avatar'), UserController.store)

module.exports = routes
