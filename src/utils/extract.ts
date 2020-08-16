import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request } from "express";

dotenv.config();
const SECRET = String(process.env.SECRET);

const extractID = (req: Request): any => {
  try {
    const auth = req.headers.authorization;
    const token = auth ? auth.split(" ")[1] : "";
    const body = jwt.verify(token, SECRET);
    return { error: false, body };
  } catch (e) {
    return { error: true, e };
  }
};

export default extractID;
