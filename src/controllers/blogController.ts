import { Request, Response } from "express";
import { Controller, Get } from "@overnightjs/core";

@Controller("api/blogs")
export class BlogController {
  @Get(":id")
  get = (req: Request, res: Response): void => {
    const { id } = req.params;
    res.json({ message: `Blog ${id}` });
  };
}
