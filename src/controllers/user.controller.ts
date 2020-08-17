import { Controller, Post } from "@overnightjs/core";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { isEmpty } from "lodash";
import User, { UserType } from "../models/user";
import { options } from "../utils/strategy";

@Controller("auth")
export default class UserController {
  @Post("register")
  registerUser = async (req: Request, res: Response) => {
    try {
      const user: UserType = req.body;
      const { name, email, password } = user;
      if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
        res.json({ error: true, message: "Please fill out all fields" });
      } else {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
          const salt = genSaltSync(7);
          const hashed = hashSync(password, salt);
          const newUser = await User.create({
            name,
            email,
            password: hashed,
          });
          res.json({ error: false, user: newUser });
        } else {
          res.json({ error: true, message: "User exists already" });
        }
      }
    } catch (e) {
      res.json({ error: true, message: e });
    }
  };

  @Post("login")
  loginUser = async (req: Request, res: Response) => {
    try {
      const user: UserType = req.body;
      const { email, password } = user;
      const oldUser = await User.findOne({ email })!;
      if (isEmpty(email) || isEmpty(password)) {
        res.json({ error: true, message: "Please fill all fields" });
      } else {
        if (!oldUser) {
          res.json({ error: true, message: "User Exists already" });
        } else {
          const userDetails: UserType = oldUser;
          if (compareSync(password, userDetails.password)) {
            const payload = {
              id: userDetails._id,
              name: userDetails.name,
              email: userDetails.email,
            };
            const token = sign(payload, options.secretOrKey);
            res.json({ error: false, token });
          } else {
            res.json({ error: true, message: "Incorrect Password" });
          }
        }
      }
    } catch (e) {
      res.json({ error: true, message: e });
    }
  };
}
