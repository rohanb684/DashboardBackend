import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendResponse from "./sendResponse.js";

dotenv.config();
export const sendJwtTokenInCookies = (res, user) => {
  const jwtToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const tokenName = user.role ? "adminToken" : "userToken";

  res.cookie(tokenName, jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, 200, "Logged In Successfully", user);
};
