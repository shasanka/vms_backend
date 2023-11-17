import { Request, Response } from "express";
import UserModel, { User } from "../models/user";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import RoleModel, { Role } from "../models/role";

const signIn = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate<{
      role: Role;
    }>("role");
    
    console.log("🚀 ~ file: authController.ts:11 ~ user ~ user:", user)
    if (!user) {
      return res.status(404).json({ message: "Invalid username or password!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.SECRET_PRIVATE_ACCESS_KEY!,
      {
        algorithm: "HS256",
        expiresIn: "24h", // 24 hours
      }
    );

    const authorities = user.role ? `ROLE_${user.role.name.toUpperCase()}` : 'ROLE_USER';

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: authorities,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error during user sign-in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signOut = (req: Request, response: Response) => {
  return response.status(200).json({ message: "Signedout" });
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    if (role) {
      const roleFound = await RoleModel.find({ name: { $in: role } });

      if (!roleFound ) {
        throw new Error("Not all roles could be retrieved or do not exist.");
      }

      user.role = roleFound[0]._id;
    } else {
      const defaultRole = await RoleModel.findOne({ name: "user" });

      if (defaultRole) {
        user.role = defaultRole._id;
      }
    }

    await user.save();

    return res.status(200).json({ message: "User signed up" });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authController = {
  signIn,
  signOut,
  signUp,
};
export default authController;
