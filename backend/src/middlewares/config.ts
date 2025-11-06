import express from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
    origin: [
        "http://localhost:3000",
        "https://synkro-psi.vercel.app",
        "http://192.168.1.99:3000",

    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};



app.use("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app as config };