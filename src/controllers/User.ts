import Logging from "../library/Logging";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import UserService from "../service/User";

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      group: req.body.group,
      role: req.body.role,
    });

    Logging.info("New user saved.");

    return res.status(201).json(user);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function readUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.readUserById(req.params.userId as string);
    if (user === null) return res.status(404);
    Logging.info(`Reading user: ${JSON.stringify(user)}`);
    return res.status(200).json(user);
  } catch (error) {
    Logging.error(error);

    return res.status(500).json({ message: error });
  }
}

async function readAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.readAllUsers();
    Logging.info(`${users.length}`);
    return res.status(200).json(users);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const data: IUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      group: req.body.group,
      role: req.body.role,
    };
    const user = await UserService.updateUser(req.params.userId as string, data);
    return res.status(200).json(user);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.deleteUser(req.params.userId as string);
    return res.status(200).json(user);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

export default {createUser, readUser, readAllUsers, updateUser, deleteUser};
