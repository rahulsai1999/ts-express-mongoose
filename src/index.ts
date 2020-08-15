// dependencies
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

// utils
import { dbConnect } from "./utils/db_conn";

// controllers
import { BlogController } from "./controllers/blogController";

dotenv.config();

class ExpressServer extends Server {
  constructor() {
    super();
    dbConnect();

    // utilities
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));

    // Base Route
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ message: "API Health OK" });
    });

    // Controllers
    const blog = new BlogController();
    super.addControllers([blog]);
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
