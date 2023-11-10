import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/user";
import RoleModel from "../models/role";
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    // Check if bearer[1] exists
    if (bearer.length < 2 || !bearer[1]) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bearerToken = bearer[1];

    // Verify the token
    jwt.verify(
      bearerToken,
      process.env.SECRET_PRIVATE_ACCESS_KEY!,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedPayload = decoded as JwtPayload;
        // If the token is valid, you can access the decoded information in `decoded`

        req.userId = decodedPayload.id;
        next();
      }
    );
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the request has a userId
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Missing userId" });
    }

    // Find the user by ID
    const user = await UserModel.findById(req.userId).exec();

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      // Find roles associated with the user
      const roles = await RoleModel.find({
        _id: { $in: user.roles },
      });

      // Check if user has the admin role
      const isAdmin = roles.some((role) => role.name === "admin");
      if (isAdmin) {
        // If user is an admin, proceed to the next middleware
        next();
      } else {
        // If user is not an admin, return a 403 Forbidden status
        return res.status(403).json({ message: "Require Admin Role!" });
      }
    } catch (err: any) {
      // Handle role retrieval errors with a 500 Internal Server Error status
      return res
        .status(500)
        .json({ message: err.message || "Internal Server Error" });
    }
  } catch (err: any) {
    // Handle unexpected errors with a 500 Internal Server Error status
    return res
      .status(500)
      .json({ message: err.message || "Internal Server Error" });
  }
};

const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the request has a userId
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Missing userId" });
    }

    // Find the user by ID
    const user = await UserModel.findById(req.userId).exec();

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find roles associated with the user
    const roles = await RoleModel.find({
      _id: { $in: user.roles },
    });

    // Check if user has the moderator role
    const isModerator = roles.some((role) => role.name === "moderator");
    if (isModerator) {
      // If user is a moderator, proceed to the next middleware
      next();
    } else {
      // If user is not a moderator, return a 403 Forbidden status
      return res.status(403).json({ message: "Require Moderator Role!" });
    }
  } catch (err: any) {
    // Handle unexpected errors with a 500 Internal Server Error status
    return res
      .status(500)
      .json({ message: err.message || "Internal Server Error" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

export default authJwt;
