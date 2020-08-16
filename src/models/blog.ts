import { Document, Schema, Model, model } from "mongoose";

interface BlogType extends Document {
  title: string;
  caption?: string;
  text: string;
}

const blogSchema = new Schema({
  title: String,
  caption: String,
  text: String,
});

const blog: Model<BlogType> = model("blog", blogSchema);

export { blog as default, BlogType };
