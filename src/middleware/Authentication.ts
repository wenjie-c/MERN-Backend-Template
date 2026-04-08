import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../models/JWTPayload";
import { config } from "../config/config";
import UserService from "../service/User";
import { IUser } from "../models/user";
import Logging from "../library/Logging";

export async function TokenValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //const token = req.header('auth-token');
  //if (!token) return res.status(401).json('Access Denied');
  try{
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "No hay token" });
  }
  const token: string = authHeader.split(" ")[1] as string;

  const payload = jwt.verify(token, config.jwt.accessSecret) as IJwtPayload;
  req.userId = payload.id;
  next();}
  catch(error){
    Logging.error(error);
    return res.status(500).json({message: error});
  }
}

export async function authenticateRole(req: Request, res: Response, next: NextFunction) {
    //authenticateToken(req, res, next);
    if (!req.userId) return res.status(400).json({ message: 'Please, provide user data' });
    const user : IUser = await UserService.readUserById(req.userId) as IUser;
    if (user.role !== 'admin') return res.status(401).json({ message: 'You are unauthorized' });
    next();
}