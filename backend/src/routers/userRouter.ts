import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

// Create
userRouter.post("/register", userController.createProfile);

// Read
userRouter.post("/auth", userController.auth);
userRouter.get("/profile/:id", userController.getProfileById);
userRouter.post("/check-token", userController.checkToken);

// Update
userRouter.patch("/profile/:id", userController.updateProfile);

// Delete
userRouter.delete("/profile/:id", userController.deleteProfile);

export default userRouter;