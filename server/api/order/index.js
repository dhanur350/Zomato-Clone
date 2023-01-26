import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/order";

const Router = express.Router();

/**
 * Route :   /
 * Desc  :   Get all orders by user id
 * params:   none
 * Access:   Private
 * Method:   GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const getOrders = await OrderModel.findOne({ user: user._id });
      if (!getOrders)
        return res
          .status(400)
          .json({ error: "No order for this user found here" });
      return res.status(200).json({ orders: getOrders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route :   /new
 * Desc  :   Add new order
 * params:   none
 * Access:   Private
 * Method:   PUT
 */
Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;

      const { orderDetails } = req.body;
      const addNewOrder = await OrderModel.findOneAndUpdate(
        {
          user: user._id,
        },
        {
          $push: {
            orderDetails: orderDetails,
          },
        },
        {
          new: true,
        }
      );
      return res.json({ order: addNewOrder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;



/***
 * 5-15 => alternative
 * sat-sun 
 * 2+2
 * 4 days aws, devops
 * 
 */