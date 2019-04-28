const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

// IMPORTAÇÃO DE CONTROLLERS
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

// IMPORTAÇÃO DE MIDDLEWARE
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const routes = express.Router()

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

// ROTAS SIGN UP
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)
// ROTAS SIGN IN
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
// ROTAS LOGOUT
routes.get('/app/logout', SessionController.destroy)
// ROTAS APPOINTMENTS
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
// ROTAS AVAILABLE
routes.get('/app/available/:provider', AvailableController.index)
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
