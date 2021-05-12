const fs = require('fs');
const saml = require('passport-saml');

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  const samlStrategy = new saml.Strategy({
    callbackUrl: `http://localhost:${process.env.PORT || 3000}/acs`,
    entryPoint: process.env.SSO_ENTRY_POINT || "http://localhost:9105/sso",
    issuer: `http://localhost:${process.env.PORT || 3000}`,
    identifierFormat: null,
    cert: fs.readFileSync(process.env.PUBLIC_KEY_PATH || __dirname + '/demo-public-key.cer', 'utf8'),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true
  }, function(profile, done) {
    return done(null, profile);
  });

  passport.use(samlStrategy);
}