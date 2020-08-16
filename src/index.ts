// dependencies
import * as cors from "cors";
import * as morgan from "morgan";
import * as dotenv from "dotenv";
import * as passport from "passport";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { json, urlencoded } from "body-parser";
import { Request, Response } from "express";

// controllers
import BlogController from "./controllers/blog.controller";
import AuthController from "./controllers/user.controller";

// utils
import { dbConnect } from "./utils/db_conn";
import { strategy } from "./utils/strategy";

dotenv.config();

class ExpressServer extends Server {
  constructor() {
    super();
    dbConnect();

    // utilities
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    passport.use(strategy);

    // Base Route
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: "API Health OK" });
    });

    // Controllers
    const auth = new AuthController();
    const blog = new BlogController();
    super.addControllers([auth, blog]);
  }

  public start = (port: any) => {
    this.app.listen(port, () => {
      Logger.Imp(`Server listening on port: ${port}`);
    });
  };
}

const PORT = process.env.PORT;
const server = new ExpressServer();
server.start(PORT);
