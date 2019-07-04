const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment } = require('../models')

const schedule = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00'
]

class AvailableController {
  async index (req, res) {
    const {
      params: { providerId },
      query: { date }
    } = req

    const selectedDate = moment(parseInt(date))
    const appointments = await Appointment.findAll({
      where: {
        provider_id: providerId,
        date: {
          [Op.between]: [
            selectedDate.startOf('day').format(),
            selectedDate.endOf('day').format()
          ]
        }
      }
    })

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = selectedDate
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.some(
            appointment => moment(appointment.date).format('HH:mm') === time
          )
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
