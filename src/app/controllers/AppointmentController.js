const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const {
      params: { providerId }
    } = req
    const provider = await User.findByPk(providerId)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const {
      session: {
        user: { id }
      },
      params: { providerId },
      body: { date }
    } = req

    await Appointment.create({
      user_id: id,
      provider_id: providerId,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
