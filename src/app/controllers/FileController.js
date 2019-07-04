const path = require('path')

class FileController {
  show (req, res) {
    const {
      params: { file }
    } = req

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
