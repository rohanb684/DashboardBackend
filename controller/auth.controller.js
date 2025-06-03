import { CustomError, UserNotFound } from "../errors/index.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import sendResponse from "../utils/sendResponse.js";
import { sendJwtTokenInCookies } from "../utils/jwtCookieResponse.js";

export const manualSignUp = async (req, res, next) => {
  console.log("manualSignUp req");

  const { name, email, password } = req.body;

  if (!name) {
    throw new CustomError("Name is required", 400);
  }
  if (!email) {
    throw new CustomError("Email is required", 400);
  }
  if (!password) {
    throw new CustomError("Password is required", 400);
  }

  try {
    const isExisitingUser = await User.findOne({ email });
    if (isExisitingUser) {
      throw new CustomError("User already exist", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendResponse(res, 201, "User created successfully");
  } catch (error) {
    next(error);
  }
};

export const manualUserSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new CustomError("Email is required", 400);
    }

    if (!password) {
      throw new CustomError("Password is required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid Password", 400);
    }
    const userDataToSend = { email: user.email, name: user.name };

    sendJwtTokenInCookies(res, userDataToSend);
  } catch (error) {
    next(error);
  }
};

export const createAdminAccount = (req, res, next) => {};
