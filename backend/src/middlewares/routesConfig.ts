import express from "express";
import { router } from "../routers/template.router";

const app = express();

app.use(router);

export { app as imports };
