import { Request, Response } from "express";
import RoleModel from "../models/role";

const getRole = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find({}).select('-__v');
    return res.status(200).json({ data: roles });
  } catch (E) {
    console.log("Rol error:", E);
    return res.status(500).json({ message: E });
  }
};

const roleController = {
  getRole,
};

export default roleController;
