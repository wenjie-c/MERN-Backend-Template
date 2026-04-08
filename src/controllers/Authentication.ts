import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../models/JWTPayload";
import User, { encryptPassword, IUser } from "../models/user";
import UserService from "../service/User";
import { config } from "../config/config";
import Logging from "../library/Logging";
import user from "../models/user";

function generateAccessToken(userId: string): string {
  const session = { id: userId, type: "access" } as IJwtPayload;
  return jwt.sign(session, config.jwt.accessSecret, {
    expiresIn: "15m", // access token dura 15 minutos
  });
}

function generateRefreshToken(userId: string): string {
  const session = { id: userId, type: "refresh" } as IJwtPayload;
  return jwt.sign(session, config.jwt.refreshSecret, {
    expiresIn: "7d", // refresh token dura 7 días
  });
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const data= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      group: req.body.group,
      role: req.body.role,
    };

    
    Logging.info(JSON.stringify(data));
    data.password = await encryptPassword(data.password);
    const user = await UserService.createUser(data);
    Logging.info("New user saved.");
    const accessToken = generateAccessToken(user!._id as string);
    const refreshToken = generateRefreshToken(user!._id as string);
    Logging.info(JSON.stringify(user));

    return res
      .header("session", accessToken)
      .header("refresh", refreshToken)
      .status(201)
      .json(user);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.readUserByEmail(req.body.email);
    if (!user) return res.status(404).json("User with that email not found!");
    const correctPassword: boolean = await user.validatePassword(
      req.body.password,
    );
    if (!correctPassword) return res.status(400).json("Incorrect password!");
    const accessToken = generateAccessToken(user!._id as string);
    const refreshToken = generateRefreshToken(user!._id as string);
    Logging.info(JSON.stringify(user));
    
    return res
      .header("session", accessToken)
      .header("refresh", refreshToken)
      .sendStatus(200);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

export async function refresh(req: Request, res: Response): Promise<Response> {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwt.refreshSecret,
    ) as IJwtPayload;

    if (decoded.type !== "refresh") {
      const message = "Invalid token type";
      Logging.error(message);
      return res.status(401).json({ message });
    }

    const user = await UserService.readUserById(decoded.id);
    if (!user) {
      const message = "User not found";
      Logging.error(message);
      return res.status(404).json({ message });
    }

    // Generate a new access token

    const accessToken = generateAccessToken(decoded.id);
    return res.header("session", accessToken).status(200);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function profile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const user = await UserService.readUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default { signup, signin, refresh, profile };
