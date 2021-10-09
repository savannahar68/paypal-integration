import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import getRoutes from "./routes";
import setupDB from "./utils/setupDb";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const startServer = async () => {
  const app = express();
  app.options("*", cors());
  app.use(cors({ credentials: true, origin: true }));
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use("/api", getRoutes());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log({ level: "info", message: `Server listening on port ${port}` });
  });

  setupDB();
};

startServer();
