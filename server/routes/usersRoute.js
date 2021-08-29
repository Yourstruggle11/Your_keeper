import express from "express";

import {
    registerUser,
    loginUser,
    getUser,
    deleteUser
} from '../controller/userController.js'

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getUser);
router.delete("/:id", deleteUser)

export default router; 