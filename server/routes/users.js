import express from "express";
import { deleteUser, follow, getUser, unfollow, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//get user
router.get("/find/:id", getUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//follow
router.put("/follow/:id", verifyToken, follow);

//unfollow
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;
