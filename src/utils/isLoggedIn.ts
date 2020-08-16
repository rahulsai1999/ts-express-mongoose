import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import { Logger } from "@overnightjs/logger";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      Logger.Imp(err);
    }
    if (!user) {
      res.json({ error: true, message: "Invalid Credentials" });
    }
    if (user) {
      next();
    }
  })(req, res, next);
};

export default isLoggedIn;
