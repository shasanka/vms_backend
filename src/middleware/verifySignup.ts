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
  // console.log("🚀 ~ file: verifySignup.ts:37 ~ req.body.role:", req.body.role)
  // if (req.body.role) {

  //   try {
  //     const existingRoles = await RoleModel.find({
  //       name: { $in: req.body.role },
  //     });
  //     console.log("🚀 ~ file: verifySignup.ts:42 ~ existingRoles:", existingRoles)

  //     // const nonExistingRoles = rolesArray.filter(
  //     //   (role: string) =>
  //     //     !existingRoles.some((existingRole) => existingRole.name === role)
  //     // );

  //     // if (nonExistingRoles.length > 0) {
  //     //   return res.status(400).json({
  //     //     message: `Failed! Roles ${nonExistingRoles.join(", ")} do not exist!`,
  //     //   });
  //     // }
  //   } catch (error) {
  //     console.error("Error checking roles:", error);
  //     return res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  if (req.body.role) {
    try {
      const existingRole = await RoleModel.findOne({
        name: req.body.role,
      });

      if (!existingRole) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.role} does not exist!`,
        });
      }
    } catch (error) {
      console.error("Error checking role:", error);
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
