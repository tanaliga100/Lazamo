import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { connectDB } from "./config/connectDB";
import { errorHandlerMidlleware } from "./middlewares/errorHandler-middleware";
import { notFoundMiddleware } from "./middlewares/notFound-middleware";
import { router as AuthRoute } from "./routes/authentication-routes";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// BASE ROUTE
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Server Alive : Express Ts" });
});
// APPLICATION ROUTES
app.use("/api/v1/auth", AuthRoute);

// 404_MIDDLEWARE
app.use(notFoundMiddleware);
// ERROR_MIDDLEWARE
app.use(errorHandlerMidlleware);

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server alive: ${port}`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
console.log(process.env);

start();