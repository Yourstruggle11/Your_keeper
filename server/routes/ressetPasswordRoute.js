import express from "express";
import {
    emailVerification,
    passwordReset
} from "../controller/resetPasswordController.js"

const router = express.Router();


router.post("/email-verify", emailVerification);
router.post("/password/:token", passwordReset);

export default router;