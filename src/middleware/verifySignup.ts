import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import RoleModel from "../models/role";

const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body ;
  if (!email || !password || !username)
    return res.status(401).json({ message: "Invalid email, username or password" });

  try {
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
     return  res.status(400).send({ message: "Failed! Email is already in use!" });
    }
    const userUsername = await UserModel.findOne({ username });
    if (userUsername) {
     return res.status(400).send({ message: "Failed! Username is already in use!" });
    }
  } catch (E) {
    console.error('Error checking duplicate username or email:', E);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  next();
};

const checkRolesExisted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.roles) {
    const rolesArray = Array.isArray(req.body.roles) ? req.body.roles : [req.body.roles];
    console.log("🚀 ~ file: verifySignup.ts:37 ~ rolesArray:", rolesArray);

    try {
      const existingRoles = await RoleModel.find({
        name: { $in: rolesArray },
      });

      const nonExistingRoles = rolesArray.filter(
        (role: string) =>
          !existingRoles.some((existingRole) => existingRole.name === role)
      );

      if (nonExistingRoles.length > 0) {
        return res.status(400).json({
          message: `Failed! Roles ${nonExistingRoles.join(", ")} do not exist!`,
        });
      }
    } catch (error) {
      console.error("Error checking roles:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  next();
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
