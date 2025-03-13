import { Request, Response, NextFunction } from "express";

const notFoundErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "NotFoundError") {
    console.log(req.query); // use req to avoid error for unused variables
    return res.status(404).json({ message: err.message });
  }

  next(err);
};

export default notFoundErrorHandler;
