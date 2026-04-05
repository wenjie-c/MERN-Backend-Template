import Logging from "../library/Logging";
import { NextFunction, Request, Response } from "express";
import Group, { IGroup } from "../models/group";
import GroupService from "../service/Group";

async function createGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const group = await GroupService.createGroup({
      name: req.body.name,
      score: req.body.score
    });

    Logging.info("New group saved.");

    return res.status(201).json(group);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function readGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const group = await GroupService.readGroupById(req.params.id as string);
    if (group === null) return res.status(404);
    Logging.info(`Reading group: ${JSON.stringify(group)}`);
    return res.status(200).json(group);
  } catch (error) {
    Logging.error(error);

    return res.status(500).json({ message: error });
  }
}

async function readAllGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const groups = await GroupService.readAllGroups();
    Logging.info(`${groups.length}`);
    return res.status(200).json(groups);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function updateGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const data: IGroup = {
      name: req.body.name,
      score: req.body.score
    };
    const group = await GroupService.updateGroup(req.params.id as string, data);
    return res.status(200).json(group);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

async function deleteGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const group = await GroupService.deleteGroup(req.params.id as string);
    return res.status(200).json(group);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: error });
  }
}

export default {createGroup, readGroup, readAllGroups, updateGroup, deleteGroup};
