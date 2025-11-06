import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import { imports } from "./middlewares/routesConfig";

const app: Express = express();

// Configuring CORS options to allow requests from the provided URLs.
const corsOptions: CorsOptions = {
  origin: ["http://localhost"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use("*", cors(corsOptions));

// Enabling the middleware to parse request bodies as JSON.
app.use(express.json());

app.use(imports);

export { app };
