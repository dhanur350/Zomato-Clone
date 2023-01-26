import express from "express";

import { RestaurantModel } from "../../database/allModels";
import {
  ValidateId,
  ValidateSearchString,
} from "../../validation/common.validation";

const Router = express.Router();

/**
 * Route :   /
 * Desc  :   Get all the restaurant details based on the city
 * params:   none
 * Access:   Public
 * Method:   GET
 */
Router.get("/", async (req, res) => {
  try {
    // http://localhost:4000/restaurant/?city=hospet
    const { city } = req.query;

    const restaurants = await RestaurantModel.find({ city });
    if (restaurants.length === 0) {
      return res.json({ error: "No restaurant found in this city" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route :   /:_id
 * Desc  :   Get individual restaurant details based on the id
 * params:   _id
 * Access:   Public
 * Method:   GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ValidateId(req.params);
    const restaurant = await RestaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(400).json({ error: "Restaurant Not Found" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route :   /search/:searchString
 * Desc  :   Get restaurants details based on search string
 * params:   searchString
 * Access:   Public
 * Method:   GET
 */
Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    await ValidateSearchString(req.params);
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });
    if (!restaurants.length === 0) {
      return res
        .status(404)
        .json({ error: `No restaurant matched with ${searchString}` });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;
