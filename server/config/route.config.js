

// const JwtPassport = require("passport-jwt")
import JwtPassport  from "passport-jwt"
// const { UserModel } = require("../database/allModels");
import { UserModel } from "../database/allModels.js";
import {Router} from "express"
//const {Router} = require("express")

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

// Authorization: "Bearer someTokenString"

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp",
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async(jwt__payload, done)=>{
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null, false)
                return done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        })
    )
}

