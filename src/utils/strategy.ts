import * as dotenv from "dotenv";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Logger } from "@overnightjs/logger";
import User from "../models/user";

dotenv.config();
const secret = String(process.env.SECRET);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JwtStrategy(options, (jwtPayload, done) => {
  User.findOne({ _id: jwtPayload.id }, (err, user) => {
    if (err) Logger.Err(err);
    if (user) done(null, user);
    else done(null, false);
  });
});

export { strategy, options };
