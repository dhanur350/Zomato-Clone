const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');


// Private route authorization config
const privateRouteConfig = require("./config/route.config");
const googleAuthConfig = require("./config/google.config");

// Database connection
const ConnectDB = require('"./database/connection"');
const Auth = require("./api/auth");
const Food = require("./api/food");
const Restaurant = require("./api/restaurant");
const User = require("./api/user");
const Menu = require("./api/menu");
const Order = require("./api/order");
const Review = require("./api/review");
const Image = require ("./api/image");

dotenv.config();

privateRouteConfig(passport);
googleAuthConfig(passport);

const zomato = express();

// adding additional passport configuration

zomato.use(cors({ origin: "http://localhost:3000" }));
zomato.use(helmet());
zomato.use(express.json());
zomato.use(session({ secret: process.env.JWTSECRET }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// /auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/image", Image);

const PORT = 4000;

zomato.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((error) => {
      console.log("Server is running, but database connection failed...");
      console.log(error);
    });
});
