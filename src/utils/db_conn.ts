import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { Logger } from "@overnightjs/logger";

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const dbConnect = (): void => {
  mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`,
    {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    },
    (err) => {
      err ? Logger.Imp(err) : Logger.Imp("Database Connected");
    }
  );
};

export { dbConnect };
