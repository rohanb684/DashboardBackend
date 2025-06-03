import express from "express";
import {
  manualSignUp,
  manualUserSignIn,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", manualSignUp);
authRouter.post("/sign-in", manualUserSignIn);

export default authRouter;
