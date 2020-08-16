import { Document, Model, Schema, model } from "mongoose";

// interface for the User object required by TypeScript
interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  blogs?: [];
}

// Actual schema required by the DB
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: "blog" }],
});

// typecasting the schema with the interface to create the actual model
const user: Model<UserType> = model("user", userSchema);

export { user as default, UserType };
