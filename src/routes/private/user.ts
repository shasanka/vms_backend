import { Router, Request, Response } from "express";

const router = Router();
router.post('/',async (req:Request,res:Response)=>{
    try {
        console.log("🚀 ~ file: user.ts:8 ~ router.post ~ req.body;:", req.body)
        // const userData = req.params;
    
        // // Create a new user with the provided data
        // const newUser = await User.create(userData);
    
        // // Save the new user to the database
        // await newUser.save();
    
        res.status(201).json({message:'d'});
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

export default router