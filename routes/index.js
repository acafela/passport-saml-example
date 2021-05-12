const express = require("express")
const { isAuthenticated } = require("./auth")
const passport = require('passport');
const router = express.Router()

router.get('/', isAuthenticated, (req, res) => {
    res.redirect('/user');
  }
);

router.get('/login', passport.authenticate('saml', { failureRedirect: '/login/error' }));

router.get('/login/error', (req, res) => {
    res.status(500).send('로그인 실패');
  }
);

router.post('/acs',
  passport.authenticate('saml', { failureRedirect: '/login/error' }),
  (req, res) => {
    console.log("SAML body", req.body.SAMLResponse)
    res.redirect('/user');
  }
);

router.get('/user', isAuthenticated, (req, res) => {
    console.log(req.user)
    res.send(req.user)
  }
);

module.exports = router;