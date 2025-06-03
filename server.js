import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import connectToDB from "./db/connectToDB.js";
import productRouter from "./routes/product.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
//   next();
// });
app.use("/api/v1/auth", authRouter);
// app.use((req, res) => {
//   console.log(`Route not handled: ${req.originalUrl}`);
//   res.status(404).send("Custom 404 - Route not found");
// });
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.send("server working correctly");
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`App listening at http://localhost:${PORT}`);
});
