import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import Blog, { BlogType } from "../models/blog";
import User from "../models/user";
import isLoggedIn from "../utils/isLoggedIn";
import extractID from "../utils/extract";

@Controller("blogs")
export default class BlogController {
  @Post()
  @Middleware(isLoggedIn)
  createBlog = async (req: Request, res: Response) => {
    try {
      const payload = extractID(req);
      const blog: BlogType = req.body;
      const { title, text } = blog;
      const { id } = payload.body;
      if (isEmpty(title) || isEmpty(text)) {
        res.json({ error: true, message: "Either title or text is missing" });
      } else {
        const createdBlog = await Blog.create(blog);
        await User.findOneAndUpdate(
          { _id: id },
          { $addToSet: { blogs: createdBlog._id } }
        );
        res.json({ error: false, createdBlog });
      }
    } catch (e) {
      res.json({ error: true, e });
    }
  };

  @Get()
  @Middleware(isLoggedIn)
  getBlogs = async (req: Request, res: Response) => {
    try {
      const blogs = await Blog.find();
      if (blogs.length > 0) {
        res.json({ error: false, blogs });
      } else {
        res.json({ error: false, message: "No Blogs found" });
      }
    } catch (e) {
      res.json({ error: true, e });
    }
  };

  @Get(":id")
  @Middleware(isLoggedIn)
  getBlog = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (isEmpty(id)) {
        res.json({ error: true, message: "No ID specified" });
      } else {
        const blog = await Blog.findOne({ _id: id });
        if (blog) {
          res.json({ error: false, blog });
        } else {
          res.json({ error: false, message: "No Blog found" });
        }
      }
    } catch (e) {
      res.json({ error: true, e });
    }
  };
}
