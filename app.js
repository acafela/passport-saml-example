const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const indexRouter = require("./routes")

const app = express();
app.set("port", process.env.PORT || 3000);
passportConfig(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret : "todareistodo" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);

app.use(function(err, req, res, next) {
  console.error("error", err);
  next(err);
});

app.listen(app.get("port"), () => {
  console.log("server start... port", app.get("port"));
})
