const Admin = require('../models/Admin');
const Axios = require('axios');

module.exports = {
  viewAdmin: async (req, res) => {
    const adminLogin = req.cookies.username;
    const token = req.cookies.token;
    const tokenType = req.cookies.tokenType;
    await Axios.get('http://localhost:6666/api/reader/', {
      headers: { Authorization: `${tokenType} ${token}` },
    })
      .then((response) => {
        res.render('pages/admin/index', {
          reader: response.data.results,
          admin: adminLogin,
        });
      })
      .catch((err) => {
        res.redirect('/login');
      });
  },
  viewSignup: (req, res) => {
    res.render('pages/admin/auth/signup');
  },
  viewLogin: (req, res) => {
    res.render('pages/admin/auth/login');
  },
};
