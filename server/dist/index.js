"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _routeConfig = _interopRequireDefault(require("./config/route.config.js"));
var _googleConfig = _interopRequireDefault(require("./config/google.config.js"));
var _connection = _interopRequireDefault(require("./database/connection.js"));
var _index = _interopRequireDefault(require("./api/auth/index.js"));
var _index2 = _interopRequireDefault(require("./api/food/index.js"));
var _index3 = _interopRequireDefault(require("./api/restaurant/index.js"));
var _index4 = _interopRequireDefault(require("./api/user/index.js"));
var _index5 = _interopRequireDefault(require("./api/menu/index.js"));
var _index6 = _interopRequireDefault(require("./api/order/index.js"));
var _index7 = _interopRequireDefault(require("./api/review/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const express = require('express');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const session = require('express-session');
// const cors = require('cors');
// const helmet = require('helmet');

// // Private route authorization config
// const privateRouteConfig = require("./config/route.config");
// const googleAuthConfig = require("./config/google.config");

// // Database connection
// const ConnectDB = require('"./database/connection"');
// const Auth = require("./api/auth");
// const Food = require("./api/food");
// const Restaurant = require("./api/restaurant");
// const User = require("./api/user");
// const Menu = require("./api/menu");
// const Order = require("./api/order");
// const Review = require("./api/review");
// const Image = require ("./api/image");

// Private route authorization config

// Database connection

// import Image from "./api/";

_dotenv.default.config();
const zomato = (0, _express.default)();
(0, _routeConfig.default)(_passport.default);
zomato.use(_express.default.json());
zomato.use((0, _expressSession.default)({
  secret: "ZomatoApp"
}));
zomato.use(_passport.default.initialize());
zomato.use(_passport.default.session());
zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running.."
  });
});

// /auth/signup
zomato.use("/auth", _index.default);
zomato.use("/food", _index2.default);
zomato.use("/restaurant", _index3.default);
zomato.use("/user", _index4.default);
zomato.use("/menu", _index5.default);
zomato.use("/order", _index6.default);
zomato.use("/review", _index7.default);
const PORT = 4000;
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log("Server is running !!");
  }).catch(error => {
    console.log("Server is running, but the database connection failed");
    console.log(error);
  });
  // console.log("Server is running !!");
});