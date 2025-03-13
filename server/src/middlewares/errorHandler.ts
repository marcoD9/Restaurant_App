import { Request, Response } from "express";
const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log(req.query); // use req to avoid error for unused variables
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;
