import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from 'dotenv';
dotenv.config(); 
import passport from "passport";
import UserModel  from "../models/userModel.mjs";
//Setting up JWT AUTH with passportJS
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret',
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id).select("-password");
      if (user) {
        return done(null, user);
      }else{
        return done(null, false);
      }
    } catch (error) {
      return done(error,false);
    }
  })
);
export default passport;