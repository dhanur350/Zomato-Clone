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
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

// Private route authorization config
import privateRouteConfig from "./config/route.config.js";
import googleAuthConfig from "./config/google.config.js";

// Database connection
import ConnectDB from "./database/connection.js";

import Auth from "./api/auth/index.js";
import Food from "./api/food/index.js";
import Restaurant from "./api/restaurant/index.js";
import User from "./api/user/index.js";
import Menu from "./api/menu/index.js";
import Order from "./api/order/index.js";
import Review from "./api/review/index.js";
// import Image from "./api/";

dotenv.config();

const zomato = express();
privateRouteConfig(passport);

zomato.use(express.json());
zomato.use(session({ secret: "ZomatoApp" }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
  res.json({
    message: "Server is running..",
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

const PORT = 4000;

zomato.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!");
    })
    .catch((error) => {
      console.log("Server is running, but the database connection failed");
      console.log(error);
    });
  // console.log("Server is running !!");
});
