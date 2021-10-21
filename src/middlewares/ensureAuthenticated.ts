import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = verify(token, `${process.env.JWT_SECRET}`) as IPayload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      errorCode: "token.invalid",
    });
  }
}
