const Reader = require('../models/Reader');
const Admin = require('../models/Admin');
const chectAuth = require('../middlewares/checkAuth.middleware');
const Path = require('path');
const randomString = require('../middlewares/randomString.middleware').RandomString;

module.exports = {
  findAll: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send(400);
    } else {
      const reader = await Reader.aggregate([
        {
          $lookup: {
            from: 'admins',
            localField: 'adminId',
            foreignField: 'email',
            as: 'admin',
          },
        },
      ])
        .then((response) => response)
        .catch((err) => false);
      if (reader) {
        res.send({
          message: 'Successfully get all reader',
          statusCode: 200,
          results: reader,
        });
      } else {
        res.status(404).json({ message: 'Reader not found' });
      }
    }
  },
  create: async (req, res) => {
    let token = await chectAuth.JWTVerify(req.headers);
    if (!token) {
      res.send(400);
    } else {
      let readerImage = req.file.image;
      if (!readerImage.mimetype.includes('image')) {
        res.status(400).json({ message: 'Invalid file type' });
      } else {
        let newNameImage = randomString(25) + readerImage.mimetype.replace('assets/img/', '.');
        let dirName = Path.join(__dirname, '../public/assets/img/');
        let pathImage = req.get('host') + '/assets/img/' + newNameImage;

        readerImage.mv(dirName + newNameImage, async (err) => {
          if (err) {
            res.status(500).json({ message: 'Error uploading file' });
          } else {
            const newReader = new Reader({
              name: req.body.name,
              email: req.body.email,
              image: pathImage,
              adminId: req.body.adminId,
            });
            await newReader
              .save(newReader)
              .then((response) => {
                res.send({
                  message: 'Successfully create new reader',
                  statusCode: 200,
                  results: response,
                });
              })
              .catch((err) => {
                res.status(500).json({ message: 'Error creating reader' });
              });
          }
        });
      }
    }
  },
};
